import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { CourseQueryService } from "../_query/course-query.service";
import { QueryItem } from "../_query/query-item";

@Component({
  selector: "app-course-search",
  templateUrl: "./course-search.component.html",
  styleUrls: ["./course-search.component.scss"],
})
export class CourseSearchComponent implements OnInit {
  queries: QueryItem<unknown>[] = [];
  queryParams: { [key: string]: string[] } = {};

  constructor(
    private courseQueryManagerService: CourseQueryService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.courseQueryManagerService.getQueries().subscribe(queries => {
      this.queries = queries;
      this.queryParams = this.courseQueryManagerService.serializeQueries();
      if (!queries.length || queries[queries.length - 1].key)
        this.courseQueryManagerService.addQuery();
    });
  }

  onSubmit() {
    this.queryParams = this.courseQueryManagerService.serializeQueries();
    this.router.navigate(["/courses"], { queryParams: this.queryParams });
  }
}
