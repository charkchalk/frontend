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
        responseType: "json",
        params: params,
        headers: {
          [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
        },
      })
      .pipe(
        map(response => {
          return {
            pagination: {
              total: response.totalPages,
              current: response.currentPage,
            },
            content: response.content,
          };
        }),
      );
  }

  get(id: string): Observable<RawOrganization> {
    return this._http.get<RawOrganization>(this._uri + "/" + id, {
      responseType: "json",
      headers: {
        [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
      },
    });
  }
}
