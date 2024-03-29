import { Component, type OnInit } from "@angular/core";
import {
  type AbstractControl,
  FormArray,
  type FormControl,
  FormGroup,
} from "@angular/forms";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Router } from "@angular/router";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CourseQueryService } from "../_query/course-query.service";
import type { QueryItem } from "../_query/query-item";

@Component({
  selector: "app-course-search",
  styleUrls: ["./course-search.component.scss"],
  templateUrl: "./course-search.component.html",
})
export class CourseSearchComponent implements OnInit {
  queries: QueryItem<unknown>[] = [];

  queryParams: Record<string, string[]> = {};

  formArray: FormArray = new FormArray<FormGroup>([]);

  constructor(
    private readonly courseQueryManagerService: CourseQueryService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.courseQueryManagerService.getQueries().subscribe(queries => {
      this.queries = queries;
      this.queryParams = this.courseQueryManagerService.serializeQueries();
      if (!queries.length || queries[queries.length - 1].key)
        this.courseQueryManagerService.addQuery();
    });
  }

  onSubmit(): void {
    this.formArray.controls
      .flatMap(function flatChildren(control): FormControl[] {
        if (control instanceof FormGroup || control instanceof FormArray) {
          return Object.values(control.controls)
            .map((subControl: AbstractControl): FormControl[] =>
              // eslint-disable-next-line no-invalid-this, @typescript-eslint/no-invalid-this
              flatChildren.call(this, subControl),
            )
            .flatMap(subControl => subControl);
        }

        return [control as FormControl];
      })
      .forEach(control => {
        control.markAsDirty();
      });

    if (this.formArray.invalid) return;

    this.queryParams = this.courseQueryManagerService.serializeQueries();
    this.router
      .navigate(["/courses"], { queryParams: this.queryParams })
      .catch(console.error);
  }

  onChildControlSet(index: number, childControl: AbstractControl): void {
    this.formArray.setControl(index, childControl);
  }

  onChildControlRemove(index: number): void {
    this.formArray.removeAt(index);
  }
}
