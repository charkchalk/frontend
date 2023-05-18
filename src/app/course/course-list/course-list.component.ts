import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";

import { CourseApiService } from "../../_api/course/course-api.service";
import { CourseQueryService } from "../_query/course-query.service";
import { QueryItem } from "../_query/query-item";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.scss"],
  providers: [
    {
      provide: MessageService,
    },
  ],
})
export class CourseListComponent implements OnInit {
  loading = true;
  pageSize = 20;
  pagination: PaginationStat = {
    total: 1,
    current: 1,
  };
  courses: RawCourse[] = [];
  queries: QueryItem<unknown>[] = [];

  constructor(
    private router: Router,
    private courseApiService: CourseApiService,
    private courseQueryService: CourseQueryService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const queries = this.courseQueryService.queries.slice(0, -1);
    this.queries = JSON.parse(JSON.stringify(queries)) as QueryItem<unknown>[];
    this.search(this.pagination.current);
  }

  lastQuerySubscription?: Subscription;

  search(page: number): void {
    this.lastQuerySubscription?.unsubscribe();
    this.lastQuerySubscription = this.courseApiService
      .getAll(this.queries, { page, size: this.pageSize })
      .subscribe(courses => {
        this.pagination = courses.pagination;
        this.courses = courses.content;
        this.loading = false;
      });
  }

  handlePageEvent(event: PPaginatorPageEvent) {
    if (this.pageSize !== event.rows) {
      this.pageSize = event.rows;
      this.pagination.total = 1;
    }
    this.courses = [];
    this.loading = true;
    this.search(event.page + 1);
  }

  onCopied(message: string) {
    this.messageService.add({
      severity: "success",
      summary: "複製成功！",
      detail: message ?? "已經複製到剪貼簿囉～",
    });
  }
}
