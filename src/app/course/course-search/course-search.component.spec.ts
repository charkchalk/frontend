import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ButtonModule } from "primeng/button";

import { CourseSearchHelperModule } from "../course-search-helper/course-search-helper.module";
import { CourseSearchComponent } from "./course-search.component";

describe("CourseSearchComponent", () => {
  let component: CourseSearchComponent;
  let fixture: ComponentFixture<CourseSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseSearchComponent],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        CourseSearchHelperModule,
        ButtonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
