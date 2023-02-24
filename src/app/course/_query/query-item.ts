import { Displayable } from "../../_types/displayable";

export interface QueryItem {
  key?: string;
  method?: string;
  value?: Displayable[];
}
