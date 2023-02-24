import { Component, OnInit } from "@angular/core";

import { CourseQueryService } from "../_query/course-query.service";
import { QueryItem } from "../_query/query-item";

@Component({
  selector: "app-course-search",
  templateUrl: "./course-search.component.html",
  styleUrls: ["./course-search.component.css"],
})
export class CourseSearchComponent implements OnInit {
  queries: QueryItem[] = [];

  constructor(private courseQueryManagerService: CourseQueryService) {}

  ngOnInit() {
    this.courseQueryManagerService.getQueries().subscribe(queries => {
      this.queries = queries;
    });
  }

  addQuery() {
    this.courseQueryManagerService.addQuery();
  }
}
