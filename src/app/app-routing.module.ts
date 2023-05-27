import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "courses",
    pathMatch: "full",
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./course/course.module").then(m => m.CourseModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
