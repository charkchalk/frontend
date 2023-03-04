import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { PlaceQueryDataProviderService } from "./place-query-data-provider.service";

describe("PlaceQueryDataProviderService", () => {
  let service: PlaceQueryDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PlaceQueryDataProviderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
