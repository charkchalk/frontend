import { ENTER, SPACE } from "@angular/cdk/keycodes";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";

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
  providers: Displayable[] = [];
  query: QueryItem = {};

  provider?: QueryDataProvider;
  methods?: Displayable[];
  options?: Displayable[];
  lastQuery?: string;
  lastInputTime = 0;
  waiting = false;

  constructor(private courseQueryService: CourseQueryService) {}

  ngOnInit() {
    this.providers = this.courseQueryService
      .getProviders()
      .map(provider => ({ key: provider.key, label: provider.label }));
    this.query = this.courseQueryService.getQuery(this.index);
    this.inputControl.valueChanges.subscribe(value => {
      if (this.provider?.type === "text") return;
      if (this.lastQuery === value) return;
      this.lastQuery = value ?? "";
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
    this.getOptions(inputControl.value ?? "");
  }

  setProvider(providerKey: string) {
    this.query.key = providerKey;
    this.query.method = undefined;
    this.query.value = undefined;
    this.notifyQueryUpdate();
    this.provider = this.courseQueryService.getProvider(providerKey);
    this.methods = this.provider?.getMethods();
    if (this.provider?.type === "text") return;
    this.getOptions("");
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

  getOptions(value: string): void {
    this.provider
      ?.getOptions({
        keyword: value.trim(),
      })
      .subscribe(options => {
        this.options = options.content.filter(option => {
          return !this.query.value?.find(
            selected => selected.key === option.key,
          );
        });
      });
  }

  selectOption(event: MatAutocompleteSelectedEvent): void {
    if (!this.query.value) this.query.value = [];
    this.query.value.push(event.option.value);
    this.options?.splice(this.options.indexOf(event.option.value), 1);
    this.inputControl.setValue("");
    this.notifyQueryUpdate();
  }

  removeSelectedOption(index: number): void {
    this.query.value?.splice(index, 1);
    this.getOptions("");
    this.notifyQueryUpdate();
  }
}
