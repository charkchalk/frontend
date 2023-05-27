import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { DateRangeApiService } from "./date-range-api.service";

describe("DateRangeApiService", () => {
  let service: DateRangeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DateRangeApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
