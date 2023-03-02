import { ENTER, SPACE } from "@angular/cdk/keycodes";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { BehaviorSubject, Subscription } from "rxjs";

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
  @Input() index!: number;
  @Input() deletable = true;
  providers: Displayable[] = [];
  query: QueryItem = {};

  provider?: QueryDataProvider;
  methods?: Displayable[];
  options: Displayable[] = [];
  lastQueryValue?: string;
  lastInputTime = 0;
  waiting = false;

  loading = new BehaviorSubject(false);
  intersectionObserver: IntersectionObserver = new IntersectionObserver(
    entries => {
      if (!entries[0].isIntersecting) {
        this.loading.next(false);
        return;
      }
      console.log("triggered loading, removed trigger");

      this.loading.next(true);
      this.intersectionObserver.disconnect();
      this.getOptions(this.inputControl.value ?? "");
    },
    {
      threshold: 1,
    },
  );

  constructor(private courseQueryService: CourseQueryService) {}

  ngOnInit() {
    this.providers = this.courseQueryService
      .getProviders()
      .map(provider => ({ key: provider.key, label: provider.label }));
    this.query = this.courseQueryService.getQuery(this.index);
    if (this.query.key) this.setProvider(this.query.key, false);
    this.inputControl.valueChanges.subscribe(value => {
      if (this.provider?.type === "text") return;
      if (this.lastQueryValue === value) return;
      this.lastQueryValue = value ?? "";
      this.lastInputTime = Date.now();
      if (!this.waiting) this.getOptionsWhenIdle(this.inputControl);
    });
  }

  getOptionsWhenIdle(inputControl: FormControl) {
    this.waiting = true;
    if (Date.now() - this.lastInputTime < 500) {
      setTimeout(() => {
        this.getOptionsWhenIdle(inputControl);
      }, 200);
      return;
    }
    this.waiting = false;
    this.page = 0;
    console.log("trigger option searching", inputControl.value);

    this.getOptions(inputControl.value ?? "");
  }

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

  notifyQueryUpdate() {
    this.courseQueryService.setQuery(this.index, this.query);
  }

  removeQuery() {
    this.courseQueryService.removeQuery(this.index);
  }

  separatorKeyCodes = [SPACE, ENTER];
  inputControl = new FormControl("");

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

  bindLoadingTrigger(): void {
    console.log("rebinding loading trigger");

    const target = document.querySelector(
      ".mat-mdc-autocomplete-panel .loading-trigger",
    );
    if (!target) return;
    this.intersectionObserver.disconnect();
    this.intersectionObserver.unobserve(target);
    this.intersectionObserver.observe(target);
  }

  page = 0;
  lastQueryRequest?: Subscription;
  getOptions(value: string): void {
    if (this.page == 0) this.options = [];
    console.log("getting options", this.page);

    this.lastQueryRequest?.unsubscribe();
    this.lastQueryRequest = this.provider
      ?.getOptions({
        page: ++this.page,
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
        this.loading.next(false);
        if (options.pagination.current >= options.pagination.total) return;
        this.bindLoadingTrigger();
      });
  }

  selectOption(event: MatAutocompleteSelectedEvent): void {
    if (!this.query.value) this.query.value = [];
    this.query.value.push(event.option.value);
    this.options.splice(this.options.indexOf(event.option.value), 1);
    this.inputControl.setValue("");
    this.notifyQueryUpdate();
  }

  removeSelectedOption(index: number): void {
    this.query.value?.splice(index, 1);
    this.getOptions("");
    this.notifyQueryUpdate();
  }
}
