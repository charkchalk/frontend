import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { CourseListItemComponent } from "./course-list-item.component";

@NgModule({
  declarations: [CourseListItemComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  exports: [CourseListItemComponent],
})
export class CourseListItemModule {}
