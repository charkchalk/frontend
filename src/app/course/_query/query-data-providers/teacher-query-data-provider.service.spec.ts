import { TestBed } from "@angular/core/testing";

import { TeacherQueryDataProviderService } from "./teacher-query-data-provider.service";

describe("TeacherQueryDataProviderService", () => {
  let service: TeacherQueryDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherQueryDataProviderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
