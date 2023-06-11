import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ProgressBarModule } from "primeng/progressbar";

import { SelectInputComponent } from "./select-input.component";

@NgModule({
  declarations: [SelectInputComponent],
  exports: [SelectInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ProgressBarModule,
  ],
})
export class SelectInputModule {}
