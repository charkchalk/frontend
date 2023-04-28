import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";

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
  providers: Displayable<string>[] = [];
  /** QueryItem that saves user inputted data */
  query: QueryItem<unknown> = {};

  /** Current filtering provider */
  provider?: QueryDataProvider;
  /** All selectable compare methods, will be undefined or null when no provider */
  methods?: Displayable<string>[];

  constructor(private courseQueryService: CourseQueryService) {}

  ngOnInit() {
    this.providers = this.courseQueryService
      .getProviders()
      .map(provider => ({ value: provider.value, label: provider.label }));
    this.query = this.courseQueryService.getQuery(this.index);
    if (this.query.key) this.setProvider(this.query.key, false);
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
    this.providerChange.next();
  }

  /**
   * To trigger queries change notification that query has been updated
   */
  notifyQueryUpdate() {
    this.courseQueryService.setQuery(this.index, this.query);
  }

  /** notify child components that provider has changed */
  providerChange: Subject<void> = new Subject<void>();

  /**
   * Update value after child component emit value updated event
   * @param value emitted value from input sub component
   */
  valueUpdated(value: Displayable<unknown>[]) {
    this.query.value = value;
    this.notifyQueryUpdate();
  }

  /**
   * Remove this whole query from queries list
   */
  removeQuery() {
    this.courseQueryService.removeQuery(this.index);
  }
}
