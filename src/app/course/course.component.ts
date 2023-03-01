import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CourseQueryService } from "./_query/course-query.service";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  loading = true;
  searching = false;

  constructor(
    private route: ActivatedRoute,
    private courseQueryService: CourseQueryService,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.courseQueryService.clearQueries();
      const providers = this.courseQueryService.getProviders();
      const queryParsers = providers.map(displayable => {
        const provider = this.courseQueryService.getProvider(displayable.key);
        if (!provider) return;
        const values = params.getAll(displayable.key);

        const queryParsers = values.map(async value => {
          this.courseQueryService.addQuery(await provider.parseQuery(value));
          this.searching = true;
        });
        return Promise.all(queryParsers);
      });

      Promise.all(queryParsers).then(() => {
        this.loading = false;
        if (this.searching) this.courseQueryService.removeEmptyQueries();
      });
    });
  }
}
