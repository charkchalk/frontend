import { HttpRequest } from "@angular/common/http";
import { NgHttpCachingConfig, NgHttpCachingStrategy } from "ng-http-caching";
import * as objectHash from "object-hash";

const hashOptions: objectHash.NormalOption = {
  algorithm: "md5",
  encoding: "hex",
};

export const ngHttpCachingConfig: NgHttpCachingConfig = {
  cacheStrategy: NgHttpCachingStrategy.DISALLOW_ALL,
  allowedMethod: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  getKey: (req: HttpRequest<any>): string | undefined => {
    const coreRequest = {
      method: req.method,
      url: req.url,
      headers: req.headers
        .keys()
        .map(key => ({ [key]: req.headers.getAll(key) })),
      params: req.params.keys().map(key => ({ [key]: req.params.getAll(key) })),
      body: req.body,
    };

    return objectHash(coreRequest, hashOptions);
  },
};
