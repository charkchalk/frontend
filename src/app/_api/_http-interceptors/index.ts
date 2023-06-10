import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { BaseUrlInterceptor } from "./base-url/base-url.interceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { multi: true, provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor },
];
