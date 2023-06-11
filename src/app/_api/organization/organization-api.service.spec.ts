import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { OrganizationApiService } from "./organization-api.service";

describe("OrganizationApiService", () => {
  let service: OrganizationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(OrganizationApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
