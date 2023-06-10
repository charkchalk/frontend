// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgHttpCachingHeaders } from "ng-http-caching";
import { map, type Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlaceApiService {
  private readonly uri = "/place";

  constructor(private readonly httpClient: HttpClient) {}

  getAll(
    options?: CanPaginate | { keyword: string },
  ): Observable<Paginated<RawPlace[]>> {
    const params = new HttpParams({
      fromObject: options as Record<string, string>,
    });

    return this.httpClient
      .get<PaginatedResponse<RawPlace[]>>(this.uri, {
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

  get(id: string): Observable<RawPlace> {
    return this.httpClient.get<RawPlace>(`${this.uri}/${id}`, {
      headers: {
        [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
      },
      responseType: "json",
    });
  }
}
