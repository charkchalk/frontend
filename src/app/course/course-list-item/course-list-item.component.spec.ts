import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ButtonModule } from "primeng/button";
import { FieldsetModule } from "primeng/fieldset";
import { TooltipModule } from "primeng/tooltip";

import { CourseListItemComponent } from "./course-list-item.component";

describe("CourseListItemComponent", () => {
  let component: CourseListItemComponent;
  let fixture: ComponentFixture<CourseListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseListItemComponent],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        ButtonModule,
        FieldsetModule,
        TooltipModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
