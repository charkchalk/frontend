import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgHttpCachingHeaders } from "ng-http-caching";
import { Observable } from "rxjs";

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

    return this._http.get<Paginated<RawPlace[]>>(this._uri, {
      responseType: "json",
      params: params,
      headers: {
        [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
      },
    });
  }

  get(id: string): Observable<RawPlace> {
    return this._http.get<RawPlace>(this._uri + "/" + id, {
      responseType: "json",
      headers: {
        [NgHttpCachingHeaders.ALLOW_CACHE]: "1",
      },
    });
  }
}
