import { Component, OnInit } from "@angular/core";

import { CourseService } from "../../_api/course/course.service";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"],
})
export class CourseListComponent implements OnInit {
  protected _courses: RawCourse[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.search().subscribe(courses => {
      console.log(courses);

      this._courses = courses;
    });
  }
}
