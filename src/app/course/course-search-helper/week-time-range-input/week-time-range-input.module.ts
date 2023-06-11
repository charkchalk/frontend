import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DividerModule } from "primeng/divider";

import { WeekTimeInputModule } from "../week-time-input/week-time-input.module";
import { WeekTimeRangeInputComponent } from "./week-time-range-input.component";

@NgModule({
  declarations: [WeekTimeRangeInputComponent],
  exports: [WeekTimeRangeInputComponent],
  imports: [CommonModule, WeekTimeInputModule, DividerModule],
})
export class WeekTimeRangeInputModule {}
