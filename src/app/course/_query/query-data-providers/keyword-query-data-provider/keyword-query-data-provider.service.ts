import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";
import { QueryItem } from "../../query-item";

@Injectable({
  providedIn: "root",
})
export class KeywordQueryDataProviderService implements QueryDataProvider {
  valueSeparator = " ";
  type = QueryDataType.text;

  private methods: Displayable<string>[] = [
    {
      value: "=",
      label: "包含",
    },
    {
      value: "!=",
      label: "不包含",
    },
  ];

  value = "keyword";
  label = "關鍵字";

  getMethods(): Displayable<string>[] {
    return this.methods;
  }

  getOptions(): Observable<StandardResponse<Displayable<string>[]>> {
    throw new Error("Method not supported.");
  }

  getValidationResult(): string | null {
    return null;
  }

  stringifyQuery(query: QueryItem<string>): string {
    if (!query.method || !query.value?.length) {
      throw new Error("Invalid query.");
    }

    return (
      query.method +
      ":" +
      query.value.map(v => v.value).join(this.valueSeparator)
    );
  }

  async parseQuery(query: string): Promise<QueryItem<string>> {
    const [method, ...values] = query.split(":");
    const value = values
      .join(":")
      .split(this.valueSeparator)
      .map(v => ({ value: v, label: v }));

    return { key: this.value, method, value };
  }
}
