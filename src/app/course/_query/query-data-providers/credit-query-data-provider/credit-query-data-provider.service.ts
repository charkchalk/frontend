import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";

import type { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";

@Injectable({
  providedIn: "root",
})
export class CreditQueryDataProviderService extends QueryDataProvider<string> {
  valueSeparator = ",";

  type = QueryDataType.text;

  private readonly methods: Displayable<string>[] = [
    {
      label: "等於",
      value: "=",
    },
    {
      label: "不等於",
      value: "!=",
    },
  ];

  value = "credit";

  label = "學分數";

  getMethods(): Displayable<string>[] {
    return this.methods;
  }

  getOptions(): Observable<Paginated<Displayable<string>[]>> {
    throw new Error("Method not supported.");
  }

  getValidationResult(value: string): string | null {
    const valid = /^\d+$/u.test(value);

    if (valid) return null;

    return "只能輸入數字";
  }

  protected serializeValue(value: Displayable<string>): string {
    return value.value;
  }

  protected async deserializeValues(
    valueStrings: string,
  ): Promise<Displayable<string>[]> {
    const values = valueStrings
      .split(this.valueSeparator)
      .map(value => ({ label: value, value }));

    return values;
  }
}
