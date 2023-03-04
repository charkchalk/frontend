import { TestBed } from "@angular/core/testing";

import { OrganizationQueryDataProviderService } from "./organization-query-data-provider.service";

describe("OrganizationQueryDataProviderService", () => {
  let service: OrganizationQueryDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationQueryDataProviderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
