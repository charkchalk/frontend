import { Component, Injectable, OnInit } from "@angular/core";
import { MatPaginatorIntl, PageEvent } from "@angular/material/paginator";
import { Subject } from "rxjs";

import { CourseApiService } from "../../_api/course/course-api.service";

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `First page`;
  itemsPerPageLabel = `Items per page:`;
  lastPageLabel = `Last page`;

  nextPageLabel = "Next page";
  previousPageLabel = "Previous page";

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
  }
}

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class CourseListComponent implements OnInit {
  loading = true;
  pagination: PaginationStat = {
    total: 1,
    current: 1,
  };
  courses: RawCourse[] = [];

  constructor(private courseApiService: CourseApiService) {}

  ngOnInit(): void {
    this.search(this.pagination.current);
  }

  search(page: number): void {
    this.courseApiService.getAll({ page, size: 20 }).subscribe(courses => {
      this.pagination = courses.pagination;
      this.courses = courses.content;
      this.loading = false;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.courses = [];
    this.loading = true;
    this.search(event.pageIndex + 1);
  }
}
