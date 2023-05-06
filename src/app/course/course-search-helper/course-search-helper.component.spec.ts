import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";

import { CourseQueryService } from "../_query/course-query.service";
import { CourseSearchHelperComponent } from "./course-search-helper.component";

describe("CourseSearchHelperComponent", () => {
  let component: CourseSearchHelperComponent;
  let fixture: ComponentFixture<CourseSearchHelperComponent>;
  let courseQueryServiceSpy: jasmine.SpyObj<CourseQueryService>;

  beforeEach(async () => {
    courseQueryServiceSpy = jasmine.createSpyObj("CourseQueryService", [
      "getProviders",
      "getQuery",
      "getProvider",
      "removeQuery",
    ]);
    await TestBed.configureTestingModule({
      declarations: [CourseSearchHelperComponent],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatInputModule,
        MatChipsModule,
        ButtonModule,
        DropdownModule,
      ],
      providers: [
        { provide: CourseQueryService, useValue: courseQueryServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSearchHelperComponent);
    courseQueryServiceSpy = TestBed.inject(
      CourseQueryService,
    ) as jasmine.SpyObj<CourseQueryService>;
    component = fixture.componentInstance;
    component.index = 0;
    courseQueryServiceSpy.getProviders.and.returnValue([]);
    courseQueryServiceSpy.getQuery.and.returnValue({});
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
