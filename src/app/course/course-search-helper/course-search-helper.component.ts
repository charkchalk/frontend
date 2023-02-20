import { Component, Input } from "@angular/core";

import { CourseQueryManagerService } from "../course-query-manager.service";

@Component({
  selector: "app-course-search-helper",
  templateUrl: "./course-search-helper.component.html",
  styleUrls: ["./course-search-helper.component.css"],
})
export class CourseSearchHelperComponent {
  @Input() index!: number;

  constructor(private courseQueryManagerService: CourseQueryManagerService) {}

  removeQuery() {
    this.courseQueryManagerService.removeQuery(this.index);
  }
}
