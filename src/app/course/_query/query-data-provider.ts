import { Observable } from "rxjs";

import { Displayable } from "../../_types/displayable";

export interface QueryDataProvider extends Displayable {
  getMethods(): Displayable[];
  getOptions(
    options?: CanPaginate | unknown,
  ): Observable<StandardResponse<Displayable[]>>;
}
