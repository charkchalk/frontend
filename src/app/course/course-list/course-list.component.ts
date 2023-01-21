import { Component, OnInit } from "@angular/core";

import { CourseService } from "../../_api/course/course.service";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"],
})
export class CourseListComponent implements OnInit {
  loading = true;
  courses: RawCourse[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.search().subscribe(courses => {
      this.loading = false;
      this.courses = courses;
    });
  }
}
