import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CourseSearchHelperComponent } from "./course-search-helper.component";

@NgModule({
  declarations: [CourseSearchHelperComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [CourseSearchHelperComponent],
})
export class CourseSearchHelperModule {}
