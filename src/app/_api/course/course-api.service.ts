import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CourseApiService {
  private _uri = "/course";

  constructor(private _http: HttpClient) {}

  getAll(options?: CanPaginate): Observable<StandardResponse<RawCourse[]>> {
    const params = new HttpParams();
    if (options) {
      for (const [key, value] of Object.entries(options)) {
        params.set(key, value);
      }
    }

    return this._http.get<StandardResponse<RawCourse[]>>(this._uri, {
      responseType: "json",
      params: params,
    });
  }
}
