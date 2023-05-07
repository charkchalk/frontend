import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgxMatTimepickerModule } from "ngx-mat-timepicker";

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
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        NgxMatTimepickerModule,
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
