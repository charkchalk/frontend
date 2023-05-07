import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NgxMatTimepickerModule } from "ngx-mat-timepicker";

import { WeekTimeInputComponent } from "./week-time-input.component";

@NgModule({
  declarations: [WeekTimeInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    NgxMatTimepickerModule,
  ],
  exports: [WeekTimeInputComponent],
})
export class WeekTimeInputModule {}
