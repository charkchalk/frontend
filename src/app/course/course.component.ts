import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CourseQueryService } from "./_query/course-query.service";

@Component({
  selector: "app-course",
  styleUrls: ["./course.component.scss"],
  templateUrl: "./course.component.html",
})
export class CourseComponent implements OnInit {
  loading = true;

  searching = false;

  constructor(
    private route: ActivatedRoute,
    private courseQueryService: CourseQueryService,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(async params => {
      this.loading = true;
      this.searching = false;
      const queries = await this.courseQueryService.deserializeQueries(params);
      this.loading = false;
      if (queries.length > 1) this.searching = true;
    });
  }
}
