import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormArray } from "@angular/forms";
import { Observable } from "rxjs";

import { Displayable } from "../../../_types/displayable";
import { WeekTimeRange } from "../../../_types/week-time";
import { QueryDataProvider } from "../../_query/query-data-provider";

@Component({
  selector: "app-week-time-range-input-list",
  templateUrl: "./week-time-range-input-list.component.html",
  styleUrls: ["./week-time-range-input-list.component.scss"],
})
export class WeekTimeRangeInputListComponent implements OnInit {
  /** An event emitter that emit events when value has been updated */
  @Output() updated: EventEmitter<Displayable<WeekTimeRange>[]> =
    new EventEmitter();
  /** Data provider of current filtering condition */
  @Input() provider?: QueryDataProvider;
  /** An event emitter that receive event from parent when provider changed */
  @Input() providerChange?: Observable<void>;
  /** Value of current filtering condition */
  @Input() value?: Displayable<unknown>[] = [];
  /** Writable value */
  protected weekTimeRanges: Displayable<WeekTimeRange>[] = [];

  @Output() controlSet = new EventEmitter<AbstractControl>();
  formArray: FormArray = new FormArray<AbstractControl>([]);

  ngOnInit() {
    this.weekTimeRanges = this.value as Displayable<WeekTimeRange>[];
    if (!this.value) this.weekTimeRanges = [];

    if (this.weekTimeRanges.length === 0) this.addEmptyRange();
  }

  addEmptyRange() {
    const emptyRange: Displayable<WeekTimeRange> = {
      value: { start: {}, end: {} },
      label: "",
    };
    this.weekTimeRanges.push(emptyRange);
  }

  onWeekTimeRangeUpdated(
    index: number,
    weekTimeRange: Displayable<WeekTimeRange>,
  ) {
    this.weekTimeRanges[index] = weekTimeRange;
    this.notifyQueryUpdate();
  }

  onWeekTimeRangeControlSet(index: number, control: AbstractControl) {
    this.formArray.setControl(index, control);
    this.controlSet.emit(this.formArray);
  }

  notifyQueryUpdate() {
    this.updated.emit(this.weekTimeRanges);
  }
}