import { Component, OnInit } from "@angular/core";

import { CourseService } from "../../_api/course/course.service";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"],
})
export class CourseListComponent implements OnInit {
  loading = true;
  pagination: PaginationStat = {
    total: 0,
    current: 0,
  };
  courses: RawCourse[] = [];

  /** For waterfall loading */
  intersectionObserver: IntersectionObserver = new IntersectionObserver(
    () => {
      this.search();
    },
    {
      threshold: 0.5,
    },
  );

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    const end = document.querySelector("#end");
    if (!end) return;
    this.intersectionObserver.observe(end);
  }

  search(): void {
    this.loading = true;
    this.courseService.search().subscribe(courses => {
      this.pagination = courses.pagination;
      this.courses = this.courses.concat(courses.content);
      this.loading = false;
      if (this.pagination.current >= this.pagination.total) {
        this.intersectionObserver.disconnect();
      }
    });
  }
}
