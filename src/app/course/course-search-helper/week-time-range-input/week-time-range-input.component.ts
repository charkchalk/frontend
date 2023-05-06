import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
  /** An event emitter that emit events when input has been focused */
  @Output() active: EventEmitter<void> = new EventEmitter();
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
  protected localValue: Displayable<WeekTimeRange>[] = [];

  ngOnInit() {
    this.localValue = this.value as Displayable<WeekTimeRange>[];
    if (!this.value) this.localValue = [];

    if (this.localValue.length === 0) this.addEmptyRange();
  }

  addEmptyRange() {
    const emptyRange: Displayable<WeekTimeRange> = {
      value: {
        start: { day: 0, time: "" },
        end: { day: 0, time: "" },
      },
      label: "",
    };
    this.localValue.push(emptyRange);
  }

  onStartSet(index: number, weekTime: WeekTime) {
    this.localValue[index].value.start = weekTime;
    this.notifyQueryUpdate();
  }

  onEndSet(index: number, weekTime: WeekTime) {
    this.localValue[index].value.end = weekTime;
    this.notifyQueryUpdate();
  }

  notifyQueryUpdate() {
    this.updated.emit(this.localValue);
  }
}
