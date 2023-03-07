import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";
import { QueryItem } from "../../query-item";

@Injectable({
  providedIn: "root",
})
export class CodeQueryDataProviderService implements QueryDataProvider {
  valueSeparator = ",";
  type = QueryDataType.text;

  private methods: Displayable[] = [
    {
      key: "=",
      label: "等於",
    },
    {
      key: "!=",
      label: "不等於",
    },
  ];

  key = "code";
  label = "選課代號";

  getMethods(): Displayable[] {
    return this.methods;
  }

  getOptions(): Observable<StandardResponse<Displayable[]>> {
    throw new Error("Method not supported.");
  }

  stringifyQuery(query: QueryItem): string {
    if (!query.method || !query.value?.length) {
      throw new Error("Invalid query.");
    }

    return (
      query.method + ":" + query.value.map(v => v.key).join(this.valueSeparator)
    );
  }

  async parseQuery(query: string): Promise<QueryItem> {
    const [method, ...values] = query.split(":");
    const value = values
      .join(":")
      .split(this.valueSeparator)
      .map(v => ({ key: v, label: v }));

    return { key: this.key, method, value };
  }
}
