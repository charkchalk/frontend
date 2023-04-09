import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { NgxMatTimepickerModule } from "ngx-mat-timepicker";

import { CourseSearchHelperComponent } from "./course-search-helper.component";
import { SelectInputComponent } from "./select-input/select-input.component";
import { TextInputComponent } from "./text-input/text-input.component";
import { WeekTimeInputComponent } from "./week-time-input/week-time-input.component";
import { WeekTimeRangeInputComponent } from "./week-time-range-input/week-time-range-input.component";

@NgModule({
  declarations: [
    CourseSearchHelperComponent,
    TextInputComponent,
    SelectInputComponent,
    WeekTimeInputComponent,
    WeekTimeRangeInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatInputModule,
    MatChipsModule,
    NgxMatTimepickerModule,
  ],
  exports: [CourseSearchHelperComponent],
})
export class CourseSearchHelperModule {}
