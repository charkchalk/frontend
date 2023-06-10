import { Component, type OnInit } from "@angular/core";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import type { PaginatorState } from "primeng/paginator";
import type { Subscription } from "rxjs";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CourseApiService } from "../../_api/course/course-api.service";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CourseQueryService } from "../_query/course-query.service";
import type { QueryItem } from "../_query/query-item";

@Component({
  providers: [
    {
      provide: MessageService,
    },
  ],
  selector: "app-course-list",
  styleUrls: ["./course-list.component.scss"],
  templateUrl: "./course-list.component.html",
})
export class CourseListComponent implements OnInit {
  loading = true;

  pageSize = 20;

  pagination: PaginationStat = {
    current: 1,
    total: 1,
  };

  courses: RawCourse[] = [];

  queries: QueryItem<unknown>[] = [];

  constructor(
    private readonly router: Router,
    private readonly courseApiService: CourseApiService,
    private readonly courseQueryService: CourseQueryService,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = (): boolean => false;
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

  handlePageEvent(event: PaginatorState): void {
    if (this.pageSize !== event.rows) {
      this.pageSize = event.rows ?? 25;
      this.pagination.total = 1;
    }
    this.courses = [];
    this.loading = true;
    this.search((event.page ?? 0) + 1);
  }

  onCopied(message: string): void {
    this.messageService.add({
      detail: message || "已經複製到剪貼簿囉～",
      severity: "success",
      summary: "複製成功！",
    });
  }
}
