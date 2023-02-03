import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  _base = "https://virtserver.swaggerhub.com/moontai0724/charkchalk/1.0.0";

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes("://")) return next.handle(request);

    const requestWithBase = request.clone({
      url: this._base + request.url,
    });
    return next.handle(requestWithBase);
  }
}
