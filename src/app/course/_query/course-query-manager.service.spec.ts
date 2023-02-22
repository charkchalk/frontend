import { TestBed } from "@angular/core/testing";

import { CourseQueryManagerService } from "./course-query-manager.service";

describe("CourseQueryManagerService", () => {
  let service: CourseQueryManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseQueryManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
