import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private _uri = "/courses";

  constructor(private _http: HttpClient) {}

  search(options?: CanPaginate): Observable<RawCourse[]> {
    const params = new HttpParams();
    if (options) {
      for (const [key, value] of Object.entries(options)) {
        params.set(key, value);
      }
    }

    return this._http
      .get<StandardResponse<RawCourse[]>>(this._uri, {
        responseType: "json",
        params: params,
      })
      .pipe(map(response => response.content));
  }
}
