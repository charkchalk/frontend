import { Clipboard } from "@angular/cdk/clipboard";
import { Component, Input } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-course-list-item",
  templateUrl: "./course-list-item.component.html",
  styleUrls: ["./course-list-item.component.css"],
})
export class CourseListItemComponent {
  @Input() course?: RawCourse;

  constructor(private _snackBar: MatSnackBar, private clipboard: Clipboard) {}

  copyCourseCode() {
    if (!this.course?.code) return;

    this.clipboard.copy(this.course.code);

    this._snackBar.open("已經複製到剪貼簿囉～", "關閉", {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  copyCourseText() {
    const courseText = [
      `我在看選課代號是 ${this.course?.code}，`,
      `由 `,
      this.course?.hosts.map(host => host.name).join(" 跟 "),
      ` 開給 ${this.course?.organization.name} 的「${this.course?.name}」。`,
      `${this.course?.type.name} ${this.course?.credit} 學分，`,
      `每週 `,
      this.course?.timeRanges
        .map(
          timeRange =>
            `${timeRange.day} ${timeRange.start_time} ~ ${timeRange.end_time}`,
        )
        .join(", "),
      ` 在 `,
      this.course?.places.map(place => place.name).join(" 跟 "),
      ` 上課。`,
    ].join("");

    this.clipboard.copy(courseText);

    this._snackBar.open("已經複製到剪貼簿囉～", "關閉", {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}
