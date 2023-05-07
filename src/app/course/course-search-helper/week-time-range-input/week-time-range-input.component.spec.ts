import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { WeekTimeInputComponent } from "../week-time-input/week-time-input.component";
import { WeekTimeRangeInputComponent } from "./week-time-range-input.component";

describe("WeekTimeRangeInputComponent", () => {
  let component: WeekTimeRangeInputComponent;
  let fixture: ComponentFixture<WeekTimeRangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeekTimeRangeInputComponent],
      imports: [NoopAnimationsModule, WeekTimeInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekTimeRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
