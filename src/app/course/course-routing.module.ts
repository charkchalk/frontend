import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";

import { CourseComponent } from "./course.component";

const routes: Routes = [
  {
    component: CourseComponent,
    path: "",
    pathMatch: "full",
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class CourseRoutingModule {}
