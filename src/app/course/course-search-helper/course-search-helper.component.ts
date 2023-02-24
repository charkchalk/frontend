import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

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
  lastInputTime = 0;
  waiting = false;

  constructor(private courseQueryService: CourseQueryService) {}

  ngOnInit() {
    this.providers = this.courseQueryService
      .getProviders()
      .map(provider => ({ key: provider.key, label: provider.label }));
    this.query = this.courseQueryService.getQuery(this.index);
    this.inputControl.valueChanges.subscribe(() => {
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
    this.provider = this.courseQueryService.getProvider(providerKey);
    this.methods = this.provider?.getMethods();
    this.getOptions("");
  }

  removeQuery() {
    this.courseQueryService.removeQuery(this.index);
  }

  inputControl = new FormControl("");

  getOptions(value: string): void {
    this.provider
      ?.getOptions({
        keyword: value,
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
  }

  removeSelectedOption(index: number): void {
    this.query.value?.splice(index, 1);
    this.getOptions("");
  }
}
