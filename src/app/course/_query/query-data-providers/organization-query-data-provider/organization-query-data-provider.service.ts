import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";

import { OrganizationApiService } from "../../../../_api/organization/organization-api.service";
import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";
import { QueryItem } from "../../query-item";

@Injectable({
  providedIn: "root",
})
export class OrganizationQueryDataProviderService implements QueryDataProvider {
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

  constructor(private organizationApiService: OrganizationApiService) {}

  value = "organization";
  label = "開課單位";

  getMethods(): Displayable<string>[] {
    return this.methods;
  }

  getOptions(
    options: CanPaginate & { keyword: string },
  ): Observable<StandardResponse<Displayable<string>[]>> {
    return this.organizationApiService.getAll(options).pipe(
      map(response => {
        return {
          pagination: response.pagination,
          content: response.content.map(organization => {
            const parents = [];
            let currentParent = organization.parent;
            while (currentParent) {
              parents.push(currentParent.name);
              currentParent = currentParent.parent;
            }
            let label = organization.name;
            if (parents.length)
              label += " (" + parents.reverse().join(" > ") + ")";

            return {
              value: organization.uuid,
              label,
            };
          }),
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
          this.organizationApiService
            .get(v)
            .pipe(map(response => response.content)),
        );

        return {
          value: host.uuid,
          label: host.name,
        };
      });

    return { key: this.value, method, value: await Promise.all(value) };
  }
}
