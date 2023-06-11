import type {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";

import { environment } from "../../../../environments/environment";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private readonly endpoint = environment.API_ENDPOINT;

  constructor() {
    if (!this.endpoint) throw new Error("No API endpoint provided.");
  }

  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    if (request.url.includes("://")) return next.handle(request);

    const requestWithBase = request.clone({
      url: this.endpoint + request.url,
    });

    return next.handle(requestWithBase);
  }
}
