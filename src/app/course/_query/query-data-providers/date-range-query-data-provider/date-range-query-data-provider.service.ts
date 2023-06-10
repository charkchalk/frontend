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
      label: "介於",
      value: "=",
    },
    {
      label: "不介於",
      value: "!=",
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
  ): Observable<Paginated<Displayable<string>[]>> {
    return this.dateRangeApiService.getAll(options).pipe(
      map(response => ({
        content: response.content.map(dateRange => ({
          label: `${dateRange.name} (${dateRange.description}) [${dateRange.startDate} ~ ${dateRange.endDate}]`,
          value: dateRange.uuid,
        })),
        pagination: response.pagination,
      })),
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
    const values = valueStrings.split(this.valueSeparator).map(async value => {
      const dateRange = await firstValueFrom(
        this.dateRangeApiService.get(value),
      );

      return {
        label: `${dateRange.name} (${dateRange.description}) [${dateRange.startDate} ~ ${dateRange.endDate}]`,
        value: dateRange.uuid,
      };
    });

    return Promise.all(values);
  }
}
