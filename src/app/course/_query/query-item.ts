import type { Displayable } from "../../_types/displayable";

export interface QueryItem<T> {
  key: string | null;
  method: string | null;
  value: Displayable<T>[];
}
