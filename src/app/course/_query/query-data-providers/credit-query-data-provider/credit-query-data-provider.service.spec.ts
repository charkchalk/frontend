import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { CreditQueryDataProviderService } from "./credit-query-data-provider.service";

describe("CreditQueryDataProviderService", () => {
  let service: CreditQueryDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CreditQueryDataProviderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
