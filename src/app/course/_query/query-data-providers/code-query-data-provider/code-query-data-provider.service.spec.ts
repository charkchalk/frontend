import { TestBed } from "@angular/core/testing";

import { CodeQueryDataProviderService } from "./code-query-data-provider.service";

describe("CodeQueryDataProviderService", () => {
  let service: CodeQueryDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeQueryDataProviderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
