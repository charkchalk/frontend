import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { TeacherApiService } from "../../../_api/teacher/teacher-api.service";
import { Displayable } from "../../../_types/displayable";
import { QueryDataProvider } from "../query-data-provider";

@Injectable({
  providedIn: "root",
})
export class TeacherQueryDataProviderService implements QueryDataProvider {
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
          content: response.content.map(teacher => ({
            key: teacher.id.toString(),
            label: teacher.name,
          })),
        };
      }),
    );
  }
}
