import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgHttpCachingHeaders } from "ng-http-caching";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TimeRangeApiService {
  private _uri = "/range/time";

  constructor(private _http: HttpClient) {}

  getAll(
    options?: CanPaginate | { keyword: string },
  ): Observable<Paginated<RawTimeRange[]>> {
    const params = new HttpParams({
      fromObject: options as Record<string, string>,
    });

    return this._http.get<Paginated<RawTimeRange[]>>(this._uri, {
      responseType: "json",
      params: params,
      headers: {
        [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
      },
    });
  }

  get(id: string): Observable<RawTimeRange> {
    return this._http.get<RawTimeRange>(this._uri + "/" + id, {
      responseType: "json",
      headers: {
        [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
      },
    });
  }
}
