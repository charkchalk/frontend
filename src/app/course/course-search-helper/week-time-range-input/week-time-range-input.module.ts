import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { WeekTimeInputModule } from "../week-time-input/week-time-input.module";
import { WeekTimeRangeInputComponent } from "./week-time-range-input.component";

@NgModule({
  declarations: [WeekTimeRangeInputComponent],
  imports: [CommonModule, WeekTimeInputModule],
  exports: [WeekTimeRangeInputComponent],
})
export class WeekTimeRangeInputModule {}
