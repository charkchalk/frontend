import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";

import { DateRangeApiService } from "../../../../_api/date-range/date-range-api.service";
import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";
import { QueryItem } from "../../query-item";

@Injectable({
  providedIn: "root",
})
export class DateRangeQueryDataProviderService implements QueryDataProvider {
  valueSeparator = ",";
  type = QueryDataType.select;

  private methods: Displayable[] = [
    {
      key: "=",
      label: "介於",
    },
    {
      key: "!=",
      label: "不介於",
    },
  ];

  constructor(private dateRangeApiService: DateRangeApiService) {}

  key = "dateRange";
  label = "學期別或授課期間";

  getMethods(): Displayable[] {
    return this.methods;
  }

  getOptions(
    options: CanPaginate & { keyword: string },
  ): Observable<StandardResponse<Displayable[]>> {
    return this.dateRangeApiService.getAll(options).pipe(
      map(response => {
        return {
          pagination: response.pagination,
          content: response.content.map(dateRange => ({
            key: dateRange.uuid,
            label: `${dateRange.name} (${dateRange.description}) [${dateRange.start} ~ ${dateRange.end}]`,
          })),
        };
      }),
    );
  }

  getValidationResult(): string | null {
    return null;
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
      .map(async v => {
        const dateRange = await firstValueFrom(
          this.dateRangeApiService
            .get(v)
            .pipe(map(response => response.content)),
        );

        return {
          key: dateRange.uuid,
          label: `${dateRange.name} (${dateRange.description}) [${dateRange.start} ~ ${dateRange.end}]`,
        };
      });

    return { key: this.key, method, value: await Promise.all(value) };
  }
}
