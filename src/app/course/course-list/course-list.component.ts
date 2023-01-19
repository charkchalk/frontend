import { Component } from "@angular/core";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"],
})
export class CourseListComponent {
  protected _courses: RawCourse[] = [
    {
      id: 1,
      code: "1134",
      name: "VTuber 實習",
      description: "",
      type: {
        id: 1,
        name: "必修",
        description: "",
      },
      credit: 3,
      organization: {
        id: 259,
        name: "資傳四A",
        description: "",
      },
      hosts: [
        {
          id: 1,
          name: "兔田佩可拉",
          description: "",
          url: "https://hololive.hololivepro.com/talents/usada-pekora/",
        },
        {
          id: 2,
          name: "櫻女巫",
          description: "",
          url: "https://hololive.hololivepro.com/talents/sakuramiko/",
        },
      ],
      places: [
        {
          id: 1,
          name: "Hololive",
        },
        {
          id: 2,
          name: "線上",
        },
      ],
      dateRange: {
        id: 1,
        name: "靜宜大學 111 學年度第一學期",
        description: "",
        start: "2022-09-05",
        end: "2023-01-06",
      },
      timeRanges: [
        {
          id: 1,
          day: "Monday",
          start_time: "09:10",
          end_time: "10:00",
        },
        {
          id: 2,
          day: "Monday",
          start_time: "10:10",
          end_time: "11:00",
        },
        {
          id: 3,
          day: "Monday",
          start_time: "11:10",
          end_time: "12:00",
        },
      ],
      link: "https://audition.hololivepro.com/",
    },
  ];
}
