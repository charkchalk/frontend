import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DividerModule } from "primeng/divider";

import { WeekTimeRangeInputModule } from "../week-time-range-input/week-time-range-input.module";
import { WeekTimeRangeInputListComponent } from "./week-time-range-input-list.component";

@NgModule({
  declarations: [WeekTimeRangeInputListComponent],
  imports: [CommonModule, DividerModule, WeekTimeRangeInputModule],
  exports: [WeekTimeRangeInputListComponent],
})
export class WeekTimeRangeInputListModule {}
