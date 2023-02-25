import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CourseQueryService } from "./_query/course-query.service";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  searching = false;

  constructor(
    private route: ActivatedRoute,
    private courseQueryService: CourseQueryService,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe(params => {
        const providers = this.courseQueryService.getProviders();
        providers.forEach(displayable => {
          const provider = this.courseQueryService.getProvider(displayable.key);
          if (!provider) return;
          const values = params.getAll(displayable.key);
          values.forEach(value => {
            this.courseQueryService.addQuery(provider.parseQuery(value));
            this.searching = true;
          });
        });
        if (this.searching) this.courseQueryService.removeQuery(0);
      })
      .unsubscribe();
  }
}
