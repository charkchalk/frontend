import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { CourseApiService } from "./course-api.service";

describe("CourseApiService", () => {
  let service: CourseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CourseApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
