import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CourseSearchComponent } from "./course-search.component";

@NgModule({
  declarations: [CourseSearchComponent],
  imports: [CommonModule],
  exports: [CourseSearchComponent],
})
export class CourseSearchModule {}
