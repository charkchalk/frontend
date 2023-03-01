import { Observable } from "rxjs";

import { Displayable } from "../../_types/displayable";
import { QueryItem } from "./query-item";

export interface QueryDataProvider extends Displayable {
  type: QueryDataType;
  getMethods(): Displayable[];
  getOptions(
    options?: CanPaginate | unknown,
  ): Observable<StandardResponse<Displayable[]>>;
  stringifyQuery(query: QueryItem): string;
  parseQuery(query: string): Promise<QueryItem>;
}

export enum QueryDataType {
  text = "text",
  select = "select",
}
