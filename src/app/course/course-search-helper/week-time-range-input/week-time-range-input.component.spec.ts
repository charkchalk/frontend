import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxMatTimepickerModule } from "ngx-mat-timepicker";

import { WeekTimeInputComponent } from "../week-time-input/week-time-input.component";
import { WeekTimeRangeInputComponent } from "./week-time-range-input.component";

describe("WeekTimeRangeInputComponent", () => {
  let component: WeekTimeRangeInputComponent;
  let fixture: ComponentFixture<WeekTimeRangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeekTimeRangeInputComponent, WeekTimeInputComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        NgxMatTimepickerModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekTimeRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
