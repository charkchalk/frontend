import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { CourseListItemModule } from "../course-list-item/course-list-item.module";
import { CourseListComponent } from "./course-list.component";

@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    CourseListItemModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  exports: [CourseListComponent],
})
export class CourseListModule {}
