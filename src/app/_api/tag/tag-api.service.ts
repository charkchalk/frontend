import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgHttpCachingHeaders } from "ng-http-caching";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TagApiService {
  private _uri = "/tag";

  constructor(private _http: HttpClient) {}

  getAll(
    options?: CanPaginate | { keyword: string },
  ): Observable<Paginated<RawOrganization[]>> {
    const params = new HttpParams({
      fromObject: options as Record<string, string>,
    });

    return this._http
      .get<PaginatedResponse<RawOrganization[]>>(this._uri, {
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

  get(id: string): Observable<RawOrganization> {
    return this._http.get<RawOrganization>(`${this._uri}/${id}`, {
      headers: {
        [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
      },
      responseType: "json",
    });
  }
}
