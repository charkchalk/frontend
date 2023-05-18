import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule } from "primeng/calendar";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";

import { WeekTimeInputComponent } from "./week-time-input.component";

describe("WeekTimeInputComponent", () => {
  let component: WeekTimeInputComponent;
  let fixture: ComponentFixture<WeekTimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeekTimeInputComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        DividerModule,
        DropdownModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
