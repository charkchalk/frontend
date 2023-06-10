import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { Router } from "@angular/router";

import { CourseQueryService } from "../_query/course-query.service";
import { QueryItem } from "../_query/query-item";

@Component({
  selector: "app-course-search",
  styleUrls: ["./course-search.component.scss"],
  templateUrl: "./course-search.component.html",
})
export class CourseSearchComponent implements OnInit {
  queries: QueryItem<unknown>[] = [];

  queryParams: { [key: string]: string[] } = {};

  formArray: FormArray = new FormArray<FormGroup>([]);

  constructor(
    private courseQueryManagerService: CourseQueryService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.courseQueryManagerService.getQueries().subscribe(queries => {
      this.queries = queries;
      this.queryParams = this.courseQueryManagerService.serializeQueries();
      if (!queries.length || queries[queries.length - 1].key)
        this.courseQueryManagerService.addQuery();
    });
  }

  onSubmit() {
    this.formArray.controls
      .flatMap(function flatChildren(control): FormControl[] {
        if (control instanceof FormGroup || control instanceof FormArray) {
          return Object.values(control.controls)
            .map((subControl: AbstractControl): FormControl[] =>
              // eslint-disable-next-line no-invalid-this
              flatChildren.call(this, subControl),
            )
            .flatMap(subControl => subControl);
        }
        return [control as FormControl];
      })
      .forEach(control => control.markAsDirty());

    if (this.formArray.invalid) return;

    this.queryParams = this.courseQueryManagerService.serializeQueries();
    this.router.navigate(["/courses"], { queryParams: this.queryParams });
  }

  onChildControlSet(index: number, childControl: AbstractControl) {
    this.formArray.setControl(index, childControl);
  }

  onChildControlRemove(index: number) {
    this.formArray.removeAt(index);
  }
}
