import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { TimeRangeApiService } from "../../../../_api/time-range/time-range-api.service";
import { Displayable } from "../../../../_types/displayable";
import { WeekTimeRange } from "../../../../_types/week-time";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";

@Injectable({
  providedIn: "root",
})
export class TimeRangeQueryDataProviderService extends QueryDataProvider<WeekTimeRange> {
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
  ): Observable<Paginated<Displayable<string>[]>> {
    return this.timeRangeApiService.getAll(options).pipe(
      map(response => {
        return {
          pagination: response.pagination,
          content: response.content.map(dateRange => ({
            value: dateRange.uuid,
            label: `${dateRange.weekday} ${dateRange.startTime} ~ ${dateRange.endTime}`,
          })),
        };
      }),
    );
  }

  getValidationResult(): string | null {
    return null;
  }

  protected serializeValue(weekTime: Displayable<WeekTimeRange>): string {
    return `${weekTime.value.start.day}-${weekTime.value.start.time}~${weekTime.value.end.day}-${weekTime.value.end.time}`;
  }

  protected async deserializeValues(
    valueStrings: string,
  ): Promise<Displayable<WeekTimeRange>[]> {
    return valueStrings.split(this.valueSeparator).map(v => {
      const [startDay, startTime, endDay, endTime] = v.split(/[-~]/);

      return {
        value: {
          start: {
            day: Number(startDay),
            time: startTime,
          },
          end: {
            day: Number(endDay),
            time: endTime,
          },
        },
        label: `${startDay}-${startTime}~${endDay}-${endTime}`,
      };
    });
  }
}
