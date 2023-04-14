import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";

import { DateRangeApiService } from "../../../../_api/date-range/date-range-api.service";
import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";

@Injectable({
  providedIn: "root",
})
export class DateRangeQueryDataProviderService extends QueryDataProvider<string> {
  valueSeparator = ",";
  type = QueryDataType.select;

  private methods: Displayable<string>[] = [
    {
      value: "=",
      label: "介於",
    },
    {
      value: "!=",
      label: "不介於",
    },
  ];

  constructor(private dateRangeApiService: DateRangeApiService) {
    super();
  }

  value = "dateRange";
  label = "學期別或授課期間";

  getMethods(): Displayable<string>[] {
    return this.methods;
  }

  getOptions(
    options: CanPaginate & { keyword: string },
  ): Observable<StandardResponse<Displayable<string>[]>> {
    return this.dateRangeApiService.getAll(options).pipe(
      map(response => {
        return {
          pagination: response.pagination,
          content: response.content.map(dateRange => ({
            value: dateRange.uuid,
            label: `${dateRange.name} (${dateRange.description}) [${dateRange.start} ~ ${dateRange.end}]`,
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
        this.dateRangeApiService.get(v).pipe(map(response => response.content)),
      );

      return {
        value: dateRange.uuid,
        label: `${dateRange.name} (${dateRange.description}) [${dateRange.start} ~ ${dateRange.end}]`,
      };
    });

    return await Promise.all(values);
  }
}
