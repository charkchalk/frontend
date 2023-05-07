import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";

import { WeekTimeInputComponent } from "./week-time-input.component";

@NgModule({
  declarations: [WeekTimeInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    DividerModule,
    DropdownModule,
  ],
  exports: [WeekTimeInputComponent],
})
export class WeekTimeInputModule {}
