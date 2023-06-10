// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgHttpCachingHeaders } from "ng-http-caching";
import { map, type Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DateRangeApiService {
  private uri = "/range/date";

  constructor(private httpClient: HttpClient) {}

  getAll(
    options?: CanPaginate | { keyword: string },
  ): Observable<Paginated<RawDateRange[]>> {
    const params = new HttpParams({
      fromObject: options as Record<string, string>,
    });

    return this.httpClient
      .get<PaginatedResponse<RawDateRange[]>>(this.uri, {
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

  get(id: string): Observable<RawDateRange> {
    return this.httpClient.get<RawDateRange>(`${this.uri}/${id}`, {
      headers: {
        [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
      },
      responseType: "json",
    });
  }
}
