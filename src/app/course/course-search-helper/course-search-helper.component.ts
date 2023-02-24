import { Component, Input, OnInit } from "@angular/core";

import { Displayable } from "../../_types/displayable";
import { CourseQueryService } from "../_query/course-query.service";
import { QueryDataProvider } from "../_query/query-data-provider";

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

  constructor(private courseQueryService: CourseQueryService) {}

  ngOnInit() {
    this.providers = this.courseQueryService
      .getProviders()
      .map(provider => ({ key: provider.key, label: provider.label }));
    this.query = this.courseQueryService.getQuery(this.index);
  }

  setProvider(providerKey: string) {
    this.provider = this.courseQueryService.getProvider(providerKey);
    this.methods = this.provider?.getMethods();
  }

  removeQuery() {
    this.courseQueryService.removeQuery(this.index);
  }
}
