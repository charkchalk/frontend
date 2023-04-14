import { Observable } from "rxjs";

import { Displayable } from "../../_types/displayable";
import { QueryItem } from "./query-item";

export abstract class QueryDataProvider<T = unknown>
  implements Displayable<string>
{
  /** Separator for values */
  abstract valueSeparator: string;

  /** Type of value */
  abstract type: QueryDataType;

  abstract value: string;
  abstract label: string;

  /**
   * To get available comparison methods that could be select by user.
   */
  abstract getMethods(): Displayable<string>[];

  /**
   * To get the options for users to select.
   * @param options Options to be passed to the provider
   */
  abstract getOptions(
    options?: CanPaginate | Record<string, unknown>,
  ): Observable<StandardResponse<Displayable<string>[]>>;

  /**
   * To validate the value is a valid value or not, only for text type.
   * @param value The value to be validate
   */
  abstract getValidationResult(value: string): string | null;

  /**
   * To stringify the query to a string.
   * @param query The query to be stringify
   */
  stringifyQuery(query: QueryItem<T>): string {
    if (!query.method || !query.value?.length) {
      throw new Error("Invalid query.");
    }

    return query.method + ":" + this.serializeValues(query.value);
  }

  protected serializeValues(values: Displayable<T>[]): string {
    return values.map(v => this.serializeValue(v)).join(this.valueSeparator);
  }

  protected abstract serializeValue(value: Displayable<T>): string;

  /**
   * To parse the query from a string.
   * @param query The query to be parse
   */
  async parseQuery(query: string): Promise<QueryItem<T>> {
    const [method, ...values] = query.split(":");
    const value = await this.deserializeValues(values.join(":"));

    return {
      key: this.value,
      method,
      value,
    };
  }

  protected abstract deserializeValues(
    value: string,
  ): Promise<Displayable<T>[]>;
}

export enum QueryDataType {
  text = "text",
  select = "select",
  timeRange = "time-range",
}
