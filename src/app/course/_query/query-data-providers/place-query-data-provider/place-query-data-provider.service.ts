import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";

import { PlaceApiService } from "../../../../_api/place/place-api.service";
import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";
import { QueryItem } from "../../query-item";

@Injectable({
  providedIn: "root",
})
export class PlaceQueryDataProviderService implements QueryDataProvider {
  type = QueryDataType.select;

  private methods: Displayable[] = [
    {
      key: "=",
      label: "等於",
    },
    {
      key: "!=",
      label: "不等於",
    },
  ];

  constructor(private placeApiService: PlaceApiService) {}

  key = "place";
  label = "上課地點";

  getMethods(): Displayable[] {
    return this.methods;
  }

  getOptions(
    options: CanPaginate & { keyword: string },
  ): Observable<StandardResponse<Displayable[]>> {
    return this.placeApiService.getAll(options).pipe(
      map(response => {
        return {
          pagination: response.pagination,
          content: response.content.map(place => ({
            key: place.id.toString(),
            label: place.name,
          })),
        };
      }),
    );
  }

  stringifyQuery(query: QueryItem): string {
    if (!query.method || !query.value?.length) {
      throw new Error("Invalid query.");
    }

    return query.method + ":" + query.value.map(v => v.key).join(",");
  }

  async parseQuery(query: string): Promise<QueryItem> {
    const [method, ...values] = query.split(":");
    const value = values
      .join(":")
      .split(",")
      .map(async v => {
        const host = await firstValueFrom(
          this.placeApiService.get(v).pipe(map(response => response.content)),
        );

        return {
          key: host.id,
          label: host.name,
        };
      });

    return { key: this.key, method, value: await Promise.all(value) };
  }
}