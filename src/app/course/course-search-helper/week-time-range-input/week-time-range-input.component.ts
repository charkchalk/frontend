import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { Displayable } from "../../../_types/displayable";
import { WeekTime, WeekTimeRange } from "../../../_types/week-time";
import { QueryDataProvider } from "../../_query/query-data-provider";

@Component({
  selector: "app-week-time-range-input",
  templateUrl: "./week-time-range-input.component.html",
  styleUrls: ["./week-time-range-input.component.scss"],
})
export class WeekTimeRangeInputComponent implements OnInit {
  /** An event emitter that emit events when value has been updated */
  @Output() updated: EventEmitter<Displayable<WeekTimeRange>> =
    new EventEmitter();
  /** Data provider of current filtering condition */
  @Input() provider?: QueryDataProvider;
  /** An event emitter that receive event from parent when provider changed */
  @Input() providerChange?: Observable<void>;
  /** Value of current filtering condition */
  @Input() value?: Displayable<unknown>;
  /** Writable value */
  protected localValue: Displayable<WeekTimeRange> = {
    value: { start: {}, end: {} },
    label: "",
  };

  @Output() controlSet = new EventEmitter<AbstractControl>();
  formGroup!: FormGroup;

  ngOnInit() {
    if (this.value) this.localValue = this.value as Displayable<WeekTimeRange>;

    this.formGroup = new FormGroup({
      start: new FormGroup({}),
      end: new FormGroup({}),
    });
  }

  onStartSet(weekTime: WeekTime) {
    this.localValue.value.start = weekTime;
    this.notifyQueryUpdate();
  }

  onEndSet(weekTime: WeekTime) {
    this.localValue.value.end = weekTime;
    this.notifyQueryUpdate();
  }

  onStartControlSet(control: AbstractControl) {
    this.formGroup.setControl("start", control);
    this.controlSet.emit(control);
  }

  onEndControlSet(control: AbstractControl) {
    this.formGroup.setControl("end", control);
    this.controlSet.emit(control);
  }

  notifyQueryUpdate() {
    this.updated.emit(this.localValue);
  }
}
