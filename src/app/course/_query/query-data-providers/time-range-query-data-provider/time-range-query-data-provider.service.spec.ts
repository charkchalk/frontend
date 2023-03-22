import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { TimeRangeQueryDataProviderService } from "./time-range-query-data-provider.service";

describe("TimeRangeQueryDataProviderService", () => {
  let service: TimeRangeQueryDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TimeRangeQueryDataProviderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
