import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";

import { CourseSearchHelperModule } from "../course-search-helper/course-search-helper.module";
import { CourseSearchComponent } from "./course-search.component";

@NgModule({
  declarations: [CourseSearchComponent],
  imports: [
    CommonModule,
    RouterModule,
    CourseSearchHelperModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  exports: [CourseSearchComponent],
})
export class CourseSearchModule {}
