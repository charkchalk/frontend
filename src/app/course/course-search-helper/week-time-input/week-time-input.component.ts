import { Component, Input } from "@angular/core";

import { Displayable } from "../../../_types/displayable";

@Component({
  selector: "app-week-time-input",
  templateUrl: "./week-time-input.component.html",
  styleUrls: ["./week-time-input.component.css"],
})
export class WeekTimeInputComponent {
  @Input() weekLabel = "星期";
  @Input() timeLabel = "時間";
  @Input() weekdays: Displayable<string>[] = [
    { value: "1", label: "星期一" },
    { value: "2", label: "星期二" },
    { value: "3", label: "星期三" },
    { value: "4", label: "星期四" },
    { value: "5", label: "星期五" },
    { value: "6", label: "星期六" },
    { value: "7", label: "星期日" },
  ];
}
