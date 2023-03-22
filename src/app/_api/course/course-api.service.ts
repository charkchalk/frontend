import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgHttpCachingHeaders } from "ng-http-caching";
import { Observable } from "rxjs";

import { QueryItem } from "../../course/_query/query-item";

@Injectable({
  providedIn: "root",
})
export class CourseApiService {
  private _uri = "/course";

  constructor(private _http: HttpClient) {}

  getAll(
    data: QueryItem[],
    options?: CanPaginate,
  ): Observable<StandardResponse<RawCourse[]>> {
    const params = new HttpParams({
      fromObject: options as Record<string, string>,
    });

    const body = data.map(item => ({
      key: item.key,
      method: item.method,
      value: item.value?.map(value => value.key),
    }));

    return this._http.post<StandardResponse<RawCourse[]>>(
      this._uri + "/search",
      body,
      {
        responseType: "json",
        params: params,
        headers: {
          [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
        },
      },
    );
  }
}
