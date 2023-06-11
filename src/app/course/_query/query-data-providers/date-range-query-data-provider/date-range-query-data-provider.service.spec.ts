import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { DateRangeQueryDataProviderService } from "./date-range-query-data-provider.service";

describe("DateRangeQueryDataProviderService", () => {
  let service: DateRangeQueryDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(DateRangeQueryDataProviderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
