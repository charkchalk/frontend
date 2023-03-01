import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TeacherApiService {
  private _uri = "/person";

  constructor(private _http: HttpClient) {}

  search(
    options?: CanPaginate | { keyword: string },
  ): Observable<StandardResponse<RawPerson[]>> {
    const params = new HttpParams();
    if (options) {
      for (const [key, value] of Object.entries(options)) {
        params.set(key, value);
      }
    }

    return this._http.get<StandardResponse<RawPerson[]>>(this._uri, {
      responseType: "json",
      params: params,
    });
  }
}
