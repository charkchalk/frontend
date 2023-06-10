import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChipsModule } from "primeng/chips";

import { TextInputComponent } from "./text-input.component";

@NgModule({
  declarations: [TextInputComponent],
  exports: [TextInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ChipsModule],
})
export class TextInputModule {}
