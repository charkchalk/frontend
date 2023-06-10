import { HttpRequest } from "@angular/common/http";
import {
  NgHttpCachingConfig,
  NgHttpCachingSessionStorage,
  NgHttpCachingStrategy,
} from "ng-http-caching";
import * as objectHash from "object-hash";

const hashOptions: objectHash.NormalOption = {
  algorithm: "md5",
  encoding: "hex",
};

export const ngHttpCachingConfig: NgHttpCachingConfig = {
  allowedMethod: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  cacheStrategy: NgHttpCachingStrategy.DISALLOW_ALL,
  getKey: (req: HttpRequest<unknown>): string | undefined => {
    const coreRequest = {
      body: req.body,
      headers: req.headers
        .keys()
        .map(key => ({ [key]: req.headers.getAll(key) })),
      method: req.method,
      params: req.params.keys().map(key => ({ [key]: req.params.getAll(key) })),
      url: req.url,
    };

    return objectHash(coreRequest, hashOptions);
  },
  store: new NgHttpCachingSessionStorage(),
};
