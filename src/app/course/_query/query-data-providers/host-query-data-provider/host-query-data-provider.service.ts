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
      label: "等於",
      value: "=",
    },
    {
      label: "不等於",
      value: "!=",
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
  ): Observable<Paginated<Displayable<string>[]>> {
    return this.personApiService.getAll(options).pipe(
      map(response => ({
        content: response.content.map(host => ({
          label: host.name,
          value: host.uuid,
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
      const host = await firstValueFrom(this.personApiService.get(value));

      return {
        label: host.name,
        value: host.uuid,
      };
    });

    return Promise.all(values);
  }
}
