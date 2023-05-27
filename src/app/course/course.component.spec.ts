import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ProgressSpinnerModule } from "primeng/progressspinner";

import { CourseComponent } from "./course.component";
import { CourseListModule } from "./course-list/course-list.module";
import { CourseRoutingModule } from "./course-routing.module";
import { CourseSearchModule } from "./course-search/course-search.module";

describe("CourseComponent", () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        CourseRoutingModule,
        CourseSearchModule,
        CourseListModule,
        ProgressSpinnerModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
