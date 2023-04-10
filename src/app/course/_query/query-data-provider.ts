import { Observable } from "rxjs";

import { Displayable } from "../../_types/displayable";
import { QueryItem } from "./query-item";

export interface QueryDataProvider<T = unknown> extends Displayable<string> {
  /** Separator for values */
  valueSeparator: string;

  /** Type of value */
  type: QueryDataType;

  /**
   * To get available comparison methods that could be select by user.
   */
  getMethods(): Displayable<string>[];

  /**
   * To get the options for users to select.
   * @param options Options to be passed to the provider
   */
  getOptions(
    options?: CanPaginate | Record<string, unknown>,
  ): Observable<StandardResponse<Displayable<string>[]>>;

  /**
   * To validate the value is a valid value or not, only for text type.
   * @param value The value to be validate
   */
  getValidationResult(value: string): string | null;

  /**
   * To stringify the query to a string.
   * @param query The query to be stringify
   */
  stringifyQuery(query: QueryItem<T>): string;

  /**
   * To parse the query from a string.
   * @param query The query to be parse
   */
  parseQuery(query: string): Promise<QueryItem<T>>;
}

export enum QueryDataType {
  text = "text",
  select = "select",
  timeRange = "time-range",
}
