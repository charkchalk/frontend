import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";

import { OrganizationApiService } from "../../../../_api/organization/organization-api.service";
import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";

@Injectable({
  providedIn: "root",
})
export class OrganizationQueryDataProviderService extends QueryDataProvider<string> {
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

  constructor(private organizationApiService: OrganizationApiService) {
    super();
  }

  value = "organization";
  label = "開課單位";

  getMethods(): Displayable<string>[] {
    return this.methods;
  }

  getOptions(
    options: CanPaginate & { keyword: string },
  ): Observable<Paginated<Displayable<string>[]>> {
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

  protected serializeValue(value: Displayable<string>): string {
    return value.value;
  }

  protected async deserializeValues(
    valueStrings: string,
  ): Promise<Displayable<string>[]> {
    const values = valueStrings.split(this.valueSeparator).map(async v => {
      const host = await firstValueFrom(this.organizationApiService.get(v));

      return {
        value: host.uuid,
        label: host.name,
      };
    });

    return await Promise.all(values);
  }
}
