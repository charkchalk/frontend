import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";

import { CourseSearchHelperModule } from "../course-search-helper/course-search-helper.module";
import { CourseSearchComponent } from "./course-search.component";

@NgModule({
  declarations: [CourseSearchComponent],
  imports: [CommonModule, RouterModule, ButtonModule, CourseSearchHelperModule],
  exports: [CourseSearchComponent],
})
export class CourseSearchModule {}
