import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { TeacherApiService } from "../../../../_api/teacher/teacher-api.service";
import { Displayable } from "../../../../_types/displayable";
import { QueryDataProvider, QueryDataType } from "../../query-data-provider";
import { QueryItem } from "../../query-item";

@Injectable({
  providedIn: "root",
})
export class TeacherQueryDataProviderService implements QueryDataProvider {
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

  constructor(private teacherApiService: TeacherApiService) {}

  key = "teacher";
  label = "授課教師";

  getMethods(): Displayable[] {
    return this.methods;
  }

  getOptions(
    options: CanPaginate & { keyword: string },
  ): Observable<StandardResponse<Displayable[]>> {
    return this.teacherApiService.search(options).pipe(
      map(response => {
        return {
          pagination: response.pagination,
          content: response.content
            .map(teacher => ({
              key: teacher.id.toString(),
              label: teacher.name,
            }))
            .filter(teacher =>
              teacher.label
                .toLowerCase()
                .includes(options.keyword.toLowerCase()),
            ),
        };
      }),
    );
  }

  stringifyQuery(query: QueryItem): string {
    if (!query.method || !query.value?.length) {
      throw new Error("Invalid query.");
    }

    return query.method + ":" + query.value.map(v => v.key).join(" ");
  }

  parseQuery(query: string): QueryItem {
    const [method, ...values] = query.split(":");
    const value = values
      .join(":")
      .split(" ")
      .map(v => ({ key: v, label: v }));

    return { key: this.key, method, value };
  }
}
