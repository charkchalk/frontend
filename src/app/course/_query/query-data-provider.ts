import { type Observable } from "rxjs";

import { type Displayable } from "../../_types/displayable";
import { type QueryItem } from "./query-item";

// eslint-disable-next-line no-shadow
export enum QueryDataType {
  select = "select",
  text = "text",
  timeRange = "time-range",
}

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
  ): Observable<Paginated<Displayable<string>[]>>;

  /**
   * To validate the value is a valid value or not, only for text type.
   * @param value The value to be validate
   */
  abstract getValidationResult(value: string): string | null;

  /**
   * To merge a query into serialized query string.
   * @param serializedQuery The serialized query string
   * @param query The query to be serialize
   */
  appendSerializedQuery(serializedQuery: string, query: QueryItem<T>): string {
    if (!query.value || !query.value.length) return serializedQuery;
    const [method, ...remains] = serializedQuery.split(":");

    if (method !== query.method) throw new Error("Queries does not match!");

    const values = remains.join(":").split(this.valueSeparator);

    for (const value of query.value) {
      const valueString = this.serializeValue(value);

      if (!values.includes(valueString)) values.push(valueString);
    }

    return `${method}:${values.join(this.valueSeparator)}`;
  }

  /**
   * To stringify the query to a string.
   * @param query The query to be stringify
   */
  serializeQuery(query: QueryItem<T>): string {
    if (!query.method || !query.value?.length) {
      throw new Error("Invalid query.");
    }

    return `${query.method}:${this.serializeValues(query.value)}`;
  }

  protected serializeValues(values: Displayable<T>[]): string {
    return values
      .map(value => this.serializeValue(value))
      .join(this.valueSeparator);
  }

  protected abstract serializeValue(value: Displayable<T>): string;

  /**
   * To parse the query from a string.
   * @param query The query to be parse
   */
  async deserializeQuery(query: string): Promise<QueryItem<T>> {
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
