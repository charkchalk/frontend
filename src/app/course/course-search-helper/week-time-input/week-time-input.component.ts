import {
  Component,
  EventEmitter,
  Input,
  type OnInit,
  Output,
} from "@angular/core";
import {
  type AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import type { Displayable } from "../../../_types/displayable";
import type { WeekTime } from "../../../_types/week-time";

@Component({
  selector: "app-week-time-input",
  styleUrls: ["./week-time-input.component.scss"],
  templateUrl: "./week-time-input.component.html",
})
export class WeekTimeInputComponent implements OnInit {
  @Input() weekLabel = "星期";

  @Input() timeLabel = "時間";

  @Input() weekdays: Displayable<number>[] = [
    { label: "星期一", value: 1 },
    { label: "星期二", value: 2 },
    { label: "星期三", value: 3 },
    { label: "星期四", value: 4 },
    { label: "星期五", value: 5 },
    { label: "星期六", value: 6 },
    { label: "星期日", value: 7 },
  ];

  /** An event emitter that emit events when value has been updated */
  @Output() updated = new EventEmitter<WeekTime>();

  @Input() value: WeekTime = {};

  @Output() controlSet = new EventEmitter<AbstractControl>();

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      time: new FormControl(this.value.time, Validators.required),
      weekday: new FormControl(this.value.day, Validators.required),
    });

    this.controlSet.emit(this.formGroup);
    this.formGroup.valueChanges.subscribe(() => {
      this.notifyQueryUpdate();
    });
  }

  notifyQueryUpdate(): void {
    this.updated.emit({
      day: this.formGroup.get("weekday")?.value as string,
      time: this.formGroup.get("time")?.value as string,
    });
  }
}
