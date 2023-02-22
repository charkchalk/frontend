import { Component, OnInit } from "@angular/core";

import { CourseQueryManagerService } from "../_query/course-query-manager.service";

@Component({
  selector: "app-course-search",
  templateUrl: "./course-search.component.html",
  styleUrls: ["./course-search.component.css"],
})
export class CourseSearchComponent implements OnInit {
  queries: QueryItem[] = [];

  constructor(private courseQueryManagerService: CourseQueryManagerService) {}

  ngOnInit() {
    this.courseQueryManagerService.getQueries().subscribe(queries => {
      this.queries = queries;
    });
  }

  addQuery() {
    this.courseQueryManagerService.addQuery();
  }
}
