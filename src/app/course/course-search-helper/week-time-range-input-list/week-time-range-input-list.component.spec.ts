import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DividerModule } from "primeng/divider";

import { WeekTimeRangeInputModule } from "../week-time-range-input/week-time-range-input.module";
import { WeekTimeRangeInputListComponent } from "./week-time-range-input-list.component";

describe("WeekTimeRangeInputListComponent", () => {
  let component: WeekTimeRangeInputListComponent;
  let fixture: ComponentFixture<WeekTimeRangeInputListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekTimeRangeInputListComponent],
      imports: [DividerModule, WeekTimeRangeInputModule],
    });
    fixture = TestBed.createComponent(WeekTimeRangeInputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
