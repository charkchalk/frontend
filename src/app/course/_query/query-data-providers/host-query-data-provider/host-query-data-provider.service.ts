import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";

import { PersonApiService } from "../../../../_api/person/person-api.service";
import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";

@Injectable({
  providedIn: "root",
})
export class HostQueryDataProviderService extends QueryDataProvider {
  valueSeparator = ",";
  type = QueryDataType.select;

  private methods: Displayable<string>[] = [
    {
      value: "=",
      label: "等於",
    },
    {
      value: "!=",
      label: "不等於",
    },
  ];

  constructor(private personApiService: PersonApiService) {
    super();
  }

  value = "host";
  label = "授課教師";

  getMethods(): Displayable<string>[] {
    return this.methods;
  }

  getOptions(
    options: CanPaginate & { keyword: string },
  ): Observable<StandardResponse<Displayable<string>[]>> {
    return this.personApiService.getAll(options).pipe(
      map(response => {
        return {
          pagination: response.pagination,
          content: response.content.map(host => ({
            value: host.uuid,
            label: host.name,
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
      const host = await firstValueFrom(
        this.personApiService.get(v).pipe(map(response => response.content)),
      );

      return {
        value: host.uuid,
        label: host.name,
      };
    });

    return await Promise.all(values);
  }
}
