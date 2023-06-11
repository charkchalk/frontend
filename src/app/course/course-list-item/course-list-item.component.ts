import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-course-list-item",
  styleUrls: ["./course-list-item.component.scss"],
  templateUrl: "./course-list-item.component.html",
})
export class CourseListItemComponent {
  @Input() course?: RawCourse;

  @Output() copied = new EventEmitter<string>();

  copyCourseCode(): void {
    if (!this.course?.code) return;

    void this.copyContent(this.course.code);
    this.copied.emit();
  }

  inspectCourse(): void {
    if (!this.course?.code) return;

    window.open(this.course.link, "_blank");
  }

  // eslint-disable-next-line max-statements
  copyCourseText(): void {
    let text = "我在看";

    if (this.course?.code) text += `選課代號是 ${this.course.code}，`;

    if (this.course?.hosts.length)
      text += ` 由 ${this.course.hosts.map(host => host.name).join(" 跟 ")}`;

    if (this.course?.organization?.name)
      text += ` 開給 ${this.course.organization.name}`;

    if (this.course?.name) text += ` 的「${this.course.name}」。\n`;

    if (this.course?.tags.length)
      text += `${this.course.tags.map(tag => tag.name).join("、")}`;

    if (this.course?.credit) text += ` ${this.course.credit} 學分，`;

    if (this.course?.timeRanges.length) {
      const times = this.course.timeRanges
        .map(
          timeRange =>
            `${timeRange.weekday} ${timeRange.startTime} ~ ${timeRange.endTime}`,
        )
        .join(", ");

      text += `每週 ${times}`;
    }

    if (this.course?.places.length)
      text += ` 在 ${this.course.places.map(place => place.name).join(" 跟 ")}`;

    text += ` 上課。`;

    void this.copyContent(text);
    this.copied.emit();
  }

  async copyContent(text: string): Promise<void> {
    await navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Content copied to clipboard");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  }
}
