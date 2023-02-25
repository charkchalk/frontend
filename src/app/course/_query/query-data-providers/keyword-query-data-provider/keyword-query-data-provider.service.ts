import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";

@Injectable({
  providedIn: "root",
})
export class KeywordQueryDataProviderService implements QueryDataProvider {
  type = QueryDataType.text;

  private methods: Displayable[] = [
    {
      key: "=",
      label: "包含",
    },
    {
      key: "!=",
      label: "不包含",
    },
  ];

  key = "keyword";
  label = "關鍵字";

  getMethods(): Displayable[] {
    return this.methods;
  }

  getOptions(): Observable<StandardResponse<Displayable[]>> {
    throw new Error("Method not supported.");
  }
}
