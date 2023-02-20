import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

import { CourseSearchHelperModule } from "../course-search-helper/course-search-helper.module";
import { CourseSearchComponent } from "./course-search.component";

describe("CourseSearchComponent", () => {
  let component: CourseSearchComponent;
  let fixture: ComponentFixture<CourseSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseSearchComponent],
      imports: [
        CourseSearchHelperModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
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
