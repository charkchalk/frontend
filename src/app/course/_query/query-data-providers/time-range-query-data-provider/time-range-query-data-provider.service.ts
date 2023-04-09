import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";

import { TimeRangeApiService } from "../../../../_api/time-range/time-range-api.service";
import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";

@Injectable({
  providedIn: "root",
})
export class TimeRangeQueryDataProviderService extends QueryDataProvider<string> {
  valueSeparator = ",";
  type = QueryDataType.timeRange;

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

  constructor(private timeRangeApiService: TimeRangeApiService) {
    super();
  }

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

  protected serializeValue(value: Displayable<string>): string {
    return value.value;
  }

  protected async deserializeValues(
    valueStrings: string,
  ): Promise<Displayable<string>[]> {
    const values = valueStrings.split(this.valueSeparator).map(async v => {
      const dateRange = await firstValueFrom(
        this.timeRangeApiService.get(v).pipe(map(response => response.content)),
      );

      return {
        value: dateRange.uuid,
        label: `${dateRange.day} ${dateRange.start_time} ~ ${dateRange.end_time}`,
      };
    });

    return await Promise.all(values);
  }
}
