import { type Displayable } from "../../_types/displayable";

export interface QueryItem<T> {
  key?: string;
  method?: string;
  value?: Displayable<T>[];
}
