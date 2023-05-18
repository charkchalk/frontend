import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";

import { CourseSearchHelperComponent } from "./course-search-helper.component";
import { SelectInputModule } from "./select-input/select-input.module";
import { TextInputModule } from "./text-input/text-input.module";
import { WeekTimeRangeInputModule } from "./week-time-range-input/week-time-range-input.module";

@NgModule({
  declarations: [CourseSearchHelperComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    TextInputModule,
    SelectInputModule,
    WeekTimeRangeInputModule,
  ],
  exports: [CourseSearchHelperComponent],
})
export class CourseSearchHelperModule {}
