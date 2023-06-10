import { HttpClientTestingModule } from "@angular/common/http/testing";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";

import { CourseQueryService } from "../_query/course-query.service";
import { CourseSearchHelperComponent } from "./course-search-helper.component";
import { SelectInputModule } from "./select-input/select-input.module";
import { TextInputModule } from "./text-input/text-input.module";
import { WeekTimeRangeInputModule } from "./week-time-range-input/week-time-range-input.module";

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
        ButtonModule,
        DropdownModule,
        TextInputModule,
        SelectInputModule,
        WeekTimeRangeInputModule,
      ],
      providers: [
        { provide: CourseQueryService, useValue: courseQueryServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSearchHelperComponent);
    // eslint-disable-next-line require-atomic-updates
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
