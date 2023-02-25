import { Observable } from "rxjs";

import { Displayable } from "../../_types/displayable";

export interface QueryDataProvider extends Displayable {
  type: QueryDataType;
  getMethods(): Displayable[];
  getOptions(
    options?: CanPaginate | unknown,
  ): Observable<StandardResponse<Displayable[]>>;
}

export enum QueryDataType {
  text = "text",
  select = "select",
}
