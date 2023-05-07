import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginatorModule } from "primeng/paginator";
import { ProgressSpinnerModule } from "primeng/progressspinner";

import { CourseListItemModule } from "../course-list-item/course-list-item.module";
import { CourseListComponent } from "./course-list.component";

@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    CourseListItemModule,
    ProgressSpinnerModule,
    PaginatorModule,
  ],
  exports: [CourseListComponent],
})
export class CourseListModule {}
