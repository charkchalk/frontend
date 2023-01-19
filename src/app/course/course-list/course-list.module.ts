import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CourseListItemModule } from "../course-list-item/course-list-item.module";
import { CourseListComponent } from "./course-list.component";
import { CourseListRoutingModule } from "./course-list-routing.module";

@NgModule({
  declarations: [CourseListComponent],
  imports: [CommonModule, CourseListRoutingModule, CourseListItemModule],
})
export class CourseListModule {}
