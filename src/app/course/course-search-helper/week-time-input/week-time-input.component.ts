import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Displayable } from "../../../_types/displayable";
import { WeekTime } from "../../../_types/week-time";

@Component({
  selector: "app-week-time-input",
  templateUrl: "./week-time-input.component.html",
  styleUrls: ["./week-time-input.component.scss"],
})
export class WeekTimeInputComponent implements OnInit {
  @Input() weekLabel = "星期";
  @Input() timeLabel = "時間";
  @Input() weekdays: Displayable<number>[] = [
    { value: 1, label: "星期一" },
    { value: 2, label: "星期二" },
    { value: 3, label: "星期三" },
    { value: 4, label: "星期四" },
    { value: 5, label: "星期五" },
    { value: 6, label: "星期六" },
    { value: 7, label: "星期日" },
  ];

  /** An event emitter that emit events when value has been updated */
  @Output() updated: EventEmitter<WeekTime> = new EventEmitter();

  @Input() value: WeekTime = {};

  @Output() controlSet = new EventEmitter<AbstractControl>();
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      weekday: new FormControl(this.value?.day, Validators.required),
      time: new FormControl(this.value?.time, Validators.required),
    });
    this.controlSet.emit(this.formGroup);
    this.formGroup.valueChanges.subscribe(() => this.notifyQueryUpdate());
  }

  notifyQueryUpdate() {
    this.updated.emit({
      day: this.formGroup.get("weekday")?.value,
      time: this.formGroup.get("time")?.value,
    });
  }
}
