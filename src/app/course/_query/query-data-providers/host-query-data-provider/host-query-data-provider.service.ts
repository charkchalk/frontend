import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";

import { PersonApiService } from "../../../../_api/person/person-api.service";
import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";
import { QueryItem } from "../../query-item";

@Injectable({
  providedIn: "root",
})
export class HostQueryDataProviderService implements QueryDataProvider {
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

  constructor(private personApiService: PersonApiService) {}

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
        const host = await firstValueFrom(
          this.personApiService.get(v).pipe(map(response => response.content)),
        );

        return {
          value: host.uuid,
          label: host.name,
        };
      });

    return { key: this.value, method, value: await Promise.all(value) };
  }
}
