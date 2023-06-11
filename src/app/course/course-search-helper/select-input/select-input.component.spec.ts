import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ProgressBarModule } from "primeng/progressbar";

import { SelectInputComponent } from "./select-input.component";

describe("SelectInputComponent", () => {
  let component: SelectInputComponent;
  let fixture: ComponentFixture<SelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectInputComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        ProgressBarModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
