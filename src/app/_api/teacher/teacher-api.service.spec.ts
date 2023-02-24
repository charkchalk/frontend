import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { TeacherApiService } from "./teacher-api.service";

describe("TeacherApiService", () => {
  let service: TeacherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TeacherApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
