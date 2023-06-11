import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { TimeRangeApiService } from "./time-range-api.service";

describe("TimeRangeApiService", () => {
  let service: TimeRangeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(TimeRangeApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
