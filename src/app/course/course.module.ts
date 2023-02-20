import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CourseComponent } from "./course.component";
import { CourseListModule } from "./course-list/course-list.module";
import { CourseRoutingModule } from "./course-routing.module";
import { CourseSearchModule } from "./course-search/course-search.module";

@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    CourseSearchModule,
    CourseListModule,
  ],
})
export class CourseModule {}
