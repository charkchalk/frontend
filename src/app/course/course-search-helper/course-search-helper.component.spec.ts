import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CourseSearchHelperComponent } from "./course-search-helper.component";

describe("CourseSearchHelperComponent", () => {
  let component: CourseSearchHelperComponent;
  let fixture: ComponentFixture<CourseSearchHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseSearchHelperComponent],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSearchHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
