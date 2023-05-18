import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { FieldsetModule } from "primeng/fieldset";
import { TooltipModule } from "primeng/tooltip";

import { CourseListItemComponent } from "./course-list-item.component";

@NgModule({
  declarations: [CourseListItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    FieldsetModule,
    TooltipModule,
  ],
  exports: [CourseListItemComponent],
})
export class CourseListItemModule {}
