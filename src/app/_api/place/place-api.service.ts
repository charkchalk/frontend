import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgHttpCachingHeaders } from "ng-http-caching";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlaceApiService {
  private _uri = "/place";

  constructor(private _http: HttpClient) {}

  getAll(
    options?: CanPaginate | { keyword: string },
  ): Observable<Paginated<RawPlace[]>> {
    const params = new HttpParams({
      fromObject: options as Record<string, string>,
    });

    return this._http
      .get<PaginatedResponse<RawPlace[]>>(this._uri, {
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
    return this._http.get<RawPlace>(`${this._uri}/${id}`, {
      headers: {
        [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
      },
      responseType: "json",
    });
  }
}
