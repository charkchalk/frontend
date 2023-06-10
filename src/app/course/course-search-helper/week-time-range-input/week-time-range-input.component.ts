import {
  Component,
  EventEmitter,
  Input,
  type OnInit,
  Output,
} from "@angular/core";
import { type AbstractControl, FormGroup } from "@angular/forms";
import type { Observable } from "rxjs";

import type { Displayable } from "../../../_types/displayable";
import type { WeekTime, WeekTimeRange } from "../../../_types/week-time";
import type { QueryDataProvider } from "../../_query/query-data-provider";

@Component({
  selector: "app-week-time-range-input",
  styleUrls: ["./week-time-range-input.component.scss"],
  templateUrl: "./week-time-range-input.component.html",
})
export class WeekTimeRangeInputComponent implements OnInit {
  /** An event emitter that emit events when value has been updated */
  @Output() updated = new EventEmitter<Displayable<WeekTimeRange>>();

  /** Data provider of current filtering condition */
  @Input() provider?: QueryDataProvider;

  /** An event emitter that receive event from parent when provider changed */
  @Input() providerChange?: Observable<void>;

  /** Value of current filtering condition */
  @Input() value?: Displayable<unknown>;

  /** Writable value */
  protected localValue: Displayable<WeekTimeRange> = {
    label: "",
    value: { end: {}, start: {} },
  };

  @Output() controlSet = new EventEmitter<AbstractControl>();

  formGroup!: FormGroup;

  ngOnInit(): void {
    if (this.value) this.localValue = this.value as Displayable<WeekTimeRange>;

    this.formGroup = new FormGroup({
      end: new FormGroup({}),
      start: new FormGroup({}),
    });
  }

  onStartSet(weekTime: WeekTime): void {
    this.localValue.value.start = weekTime;
    this.notifyQueryUpdate();
  }

  onEndSet(weekTime: WeekTime): void {
    this.localValue.value.end = weekTime;
    this.notifyQueryUpdate();
  }

  onStartControlSet(control: AbstractControl): void {
    this.formGroup.setControl("start", control);
    this.controlSet.emit(control);
  }

  onEndControlSet(control: AbstractControl): void {
    this.formGroup.setControl("end", control);
    this.controlSet.emit(control);
  }

  notifyQueryUpdate(): void {
    this.updated.emit(this.localValue);
  }
}
