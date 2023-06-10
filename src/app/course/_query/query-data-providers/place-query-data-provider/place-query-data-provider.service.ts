import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";

import { PlaceApiService } from "../../../../_api/place/place-api.service";
import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";

@Injectable({
  providedIn: "root",
})
export class PlaceQueryDataProviderService extends QueryDataProvider<string> {
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

  constructor(private placeApiService: PlaceApiService) {
    super();
  }

  value = "place";

  label = "上課地點";

  getMethods(): Displayable<string>[] {
    return this.methods;
  }

  getOptions(
    options: CanPaginate & { keyword: string },
  ): Observable<Paginated<Displayable<string>[]>> {
    return this.placeApiService.getAll(options).pipe(
      map(response => ({
        content: response.content.map(place => {
          const parents = [];
          let currentParent = place.parent;
          while (currentParent) {
            parents.push(currentParent.name);
            currentParent = currentParent.parent;
          }
          let label = place.name;
          if (parents.length) label += ` (${parents.reverse().join(" > ")})`;

          return {
            label,
            value: place.uuid,
          };
        }),
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
      const host = await firstValueFrom(this.placeApiService.get(value));

      return {
        label: host.name,
        value: host.uuid,
      };
    });

    return Promise.all(values);
  }
}
