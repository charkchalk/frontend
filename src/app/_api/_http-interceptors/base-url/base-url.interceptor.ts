import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../../../environments/environment";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private _endpoint = environment.API_ENDPOINT;

  constructor() {
    if (!this._endpoint) throw new Error("No API endpoint provided.");
  }

  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    if (request.url.includes("://")) return next.handle(request);

    const requestWithBase = request.clone({
      url: this._endpoint + request.url,
    });
    return next.handle(requestWithBase);
  }
}
