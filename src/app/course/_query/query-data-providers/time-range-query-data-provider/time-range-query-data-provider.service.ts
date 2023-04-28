import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";

import { TimeRangeApiService } from "../../../../_api/time-range/time-range-api.service";
import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";
import { QueryItem } from "../../query-item";

@Injectable({
  providedIn: "root",
})
export class TimeRangeQueryDataProviderService
  implements QueryDataProvider<string>
{
  valueSeparator = ",";
  type = QueryDataType.select;

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

  constructor(private timeRangeApiService: TimeRangeApiService) {}

  value = "timeRange";
  label = "上課時間";

  getMethods(): Displayable<string>[] {
    return this.methods;
  }

  getOptions(
    options: CanPaginate & { keyword: string },
  ): Observable<StandardResponse<Displayable<string>[]>> {
    return this.timeRangeApiService.getAll(options).pipe(
      map(response => {
        return {
          pagination: response.pagination,
          content: response.content.map(dateRange => ({
            value: dateRange.uuid,
            label: `${dateRange.day} ${dateRange.start_time} ~ ${dateRange.end_time}`,
          })),
        };
      }),
    );
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
      .map(async v => {
        const dateRange = await firstValueFrom(
          this.timeRangeApiService
            .get(v)
            .pipe(map(response => response.content)),
        );

        return {
          value: dateRange.uuid,
          label: `${dateRange.day} ${dateRange.start_time} ~ ${dateRange.end_time}`,
        };
      });

    return { key: this.value, method, value: await Promise.all(value) };
  }
}
