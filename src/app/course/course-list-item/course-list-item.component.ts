import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-course-list-item",
  styleUrls: ["./course-list-item.component.scss"],
  templateUrl: "./course-list-item.component.html",
})
export class CourseListItemComponent {
  @Input() course?: RawCourse;

  @Output() copied = new EventEmitter<string>();

  copyCourseCode() {
    if (!this.course?.code) return;

    this.copyContent(this.course.code);
    this.copied.emit();
  }

  inspectCourse() {
    if (!this.course?.code) return;

    window.open(this.course.link, "_blank");
  }

  copyCourseText() {
    const courseText = [
      `我在看選課代號是 ${this.course?.code}，`,
      `由 `,
      this.course?.hosts.map(host => host.name).join(" 跟 "),
      ` 開給 ${this.course?.organization?.name} 的「${this.course?.name}」。\n`,
      `${this.course?.tags.map(tag => tag.name).join("、")} ${
        this.course?.credit
      } 學分，`,
      `每週 `,
      this.course?.timeRanges
        .map(
          timeRange =>
            `${timeRange.weekday} ${timeRange.startTime} ~ ${timeRange.endTime}`,
        )
        .join(", "),
      ` 在 `,
      this.course?.places.map(place => place.name).join(" 跟 "),
      ` 上課。`,
    ].join("");

    this.copyContent(courseText);
    this.copied.emit();
  }

  async copyContent(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
}
