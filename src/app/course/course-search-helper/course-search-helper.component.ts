import { ENTER, SPACE } from "@angular/cdk/keycodes";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Subscription } from "rxjs";

import { Displayable } from "../../_types/displayable";
import { CourseQueryService } from "../_query/course-query.service";
import { QueryDataProvider } from "../_query/query-data-provider";
import { QueryItem } from "../_query/query-item";

@Component({
  selector: "app-course-search-helper",
  templateUrl: "./course-search-helper.component.html",
  styleUrls: ["./course-search-helper.component.css"],
})
export class CourseSearchHelperComponent implements OnInit {
  /** Index of current query in queries list */
  @Input() index!: number;
  /** Is this query deletable or not, currently only last query can be delete */
  @Input() deletable = true;
  /** All selectable DataProviders in Displayable format for users to select */
  providers: Displayable[] = [];
  /** QueryItem that saves user inputted data */
  query: QueryItem = {};

  /** Current filtering provider */
  provider?: QueryDataProvider;
  /** All selectable compare methods, will be undefined or null when no provider */
  methods?: Displayable[];
  /** All selectable options, will be empty array when text */
  options: Displayable[] = [];

  constructor(private courseQueryService: CourseQueryService) {}

  ngOnInit() {
    this.providers = this.courseQueryService
      .getProviders()
      .map(provider => ({ key: provider.key, label: provider.label }));
    this.query = this.courseQueryService.getQuery(this.index);
    if (this.query.key) this.setProvider(this.query.key, false);

    // listen to value change to filter selectable options
    this.inputControl.valueChanges.subscribe(value => {
      if (this.provider?.type === "text") return;
      if (this.lastQueryValue === value) return;
      this.lastQueryValue = value ?? "";
      this.lastInputTime = Date.now();
      if (!this.isWaiting) this.getOptionsWhenIdle(this.inputControl);
    });
  }

  /**
   * Last user entered query value to filter options.
   * This is used to detect user input changed or not,
   * in order to prevent too many requests sent to server.
   * Could be remove when requests been cached.
   */
  lastQueryValue?: string;
  /** Last time user entered something to the input */
  lastInputTime = 0;
  /**
   * Is already detecting user typing or not
   * @see getOptionsWhenIdle
   */
  isWaiting = false;

  /**
   * A recursive function to check if user has stopped typing.
   * If user has stopped typing, will trigger getOptions to get options from server.
   * @param inputControl input control to get value from
   */
  getOptionsWhenIdle(inputControl: FormControl) {
    this.isWaiting = true;
    if (Date.now() - this.lastInputTime < 500) {
      setTimeout(() => {
        this.getOptionsWhenIdle(inputControl);
      }, 200);
      return;
    }
    this.isWaiting = false;
    this.page = 0;

    this.getOptions(inputControl.value ?? "");
  }

  /**
   * To set current provider and get provider from service
   * @param providerKey key of the provider to set
   * @param reset reset query data or not, if reset, will reset query method and value
   */
  setProvider(providerKey: string, reset = true) {
    if (reset) {
      this.query.key = providerKey;
      this.query.method = undefined;
      this.query.value = undefined;
      this.notifyQueryUpdate();
    }
    this.provider = this.courseQueryService.getProvider(providerKey);
    this.methods = this.provider?.getMethods();
  }

  /**
   * To trigger queries change notification that query has been updated
   */
  notifyQueryUpdate() {
    this.courseQueryService.setQuery(this.index, this.query);
  }

  /**
   * Remove this whole query from queries list
   */
  removeQuery() {
    this.courseQueryService.removeQuery(this.index);
  }

  /** Key codes that is be used to separate words in text input chips mode */
  separatorKeyCodes = [SPACE, ENTER];
  /** Input of value */
  inputControl = new FormControl("");

  /**
   * Add text in input to query value and clear input
   * @param event event of input sent by MatChipInput
   */
  addText(event: MatChipInputEvent): void {
    if (this.provider?.type !== "text") return;

    if (event.value.trim() === "") return;

    if (!this.query.value) this.query.value = [];
    this.query.value.push({
      key: event.value.trim(),
      label: event.value.trim(),
    });
    this.inputControl.setValue("");
    this.notifyQueryUpdate();
  }

  /** Is waiting for server respond options or not */
  isLoadingOptions = false;
  /** Visibility detector, used to additional loading options */
  intersectionObserver = new IntersectionObserver(
    entries => {
      // observer will be triggered when target is going to visible or invisible
      // so we have to ignore invisible event
      if (!entries[0].isIntersecting) return;

      this.isLoadingOptions = true;
      // Stop observing while loading options
      this.intersectionObserver.disconnect();
      this.getOptions(this.inputControl.value ?? "");
    },
    { threshold: 1 },
  );

  /**
   * Bind intersection observer to element that is preserved in options menu
   */
  bindLoadingTrigger(): void {
    const target = document.querySelector(
      ".mat-mdc-autocomplete-panel .loading-trigger",
    );
    if (!target) return;
    this.intersectionObserver.disconnect();
    this.intersectionObserver.unobserve(target);
    this.intersectionObserver.observe(target);
  }

  /** Current page of options, needs to be reset when searching context changed */
  page = 0;
  /** Last query request, used to cancel last request when new request is triggered */
  lastQueryRequest?: Subscription;

  /**
   * Get options from server
   * @param value value to search options
   */
  getOptions(value: string): void {
    if (this.page == 0) this.options = [];

    this.lastQueryRequest?.unsubscribe();
    this.lastQueryRequest = this.provider
      ?.getOptions({
        page: this.page + 1,
        keyword: value.trim(),
      })
      .subscribe(options => {
        this.options.push(
          ...options.content.filter(option => {
            return !this.query.value?.find(
              selected => selected.key === option.key,
            );
          }),
        );
        this.page = options.pagination.current;
        this.isLoadingOptions = false;
        if (options.pagination.current >= options.pagination.total) return;
        this.bindLoadingTrigger();
      });
  }

  /**
   * Select an option into query value and remove it from options list
   * @param event event of option selected
   */
  selectOption(event: MatAutocompleteSelectedEvent): void {
    if (!this.query.value) this.query.value = [];
    this.query.value.push(event.option.value);
    this.options.splice(this.options.indexOf(event.option.value), 1);
    this.inputControl.setValue("");
    this.notifyQueryUpdate();
  }

  /**
   * Remove selected option from query value
   * @param index index of selected option to remove
   */
  removeSelectedOption(index: number): void {
    this.query.value?.splice(index, 1);
    this.notifyQueryUpdate();
  }
}
