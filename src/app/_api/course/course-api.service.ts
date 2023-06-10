// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgHttpCachingHeaders } from "ng-http-caching";
import { map, type Observable } from "rxjs";

import { type QueryItem } from "../../course/_query/query-item";

interface Condition<T> {
  key: string;
  method: string;
  value: T[];
}

@Injectable({
  providedIn: "root",
})
export class CourseApiService {
  private uri = "/course";

  constructor(private httpClient: HttpClient) {}

  getAll(
    data: QueryItem<unknown>[],
    options?: CanPaginate,
  ): Observable<Paginated<RawCourse[]>> {
    const params = new HttpParams({
      fromObject: options as Record<string, string>,
    });

    const conditions: Condition<unknown>[] = [];

    for (const item of data) {
      if (!item.key || !item.method || !item.value) continue;

      let existingCondition = conditions.find(
        condition =>
          condition.key === item.key && condition.method === item.method,
      );

      if (!existingCondition) {
        existingCondition = {
          key: item.key,
          method: item.method,
          value: [],
        };

        conditions.push(existingCondition);
      }

      existingCondition.value.push(...item.value.map(value => value.value));
    }

    return this.httpClient
      .post<PaginatedResponse<RawCourse[]>>(`${this.uri}/search`, conditions, {
        headers: {
          [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
        },
        params,
        responseType: "json",
      })
      .pipe(
        map(response => ({
          content: response.content,
          pagination: {
            current: response.currentPage,
            total: response.totalPages,
          },
        })),
      );
  }
}
