import { TestBed } from "@angular/core/testing";

import { CourseQueryService } from "./course-query.service";

describe("CourseQueryService", () => {
  let service: CourseQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseQueryService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should add a new query", () => {
    const initialQueriesLength = service.queries.length;
    service.addQuery();
    expect(service.queries.length).toBe(initialQueriesLength + 1);
  });

  it("should update a query", () => {
    const query = { name: "query1", value: "value1" };
    service.updateQuery(0, query);
    expect(service.getQuery(0)).toEqual(query);
  });

  it("should remove a query", () => {
    const initialQueriesLength = service.queries.length;
    service.removeQuery(0);
    expect(service.queries.length).toBe(initialQueriesLength - 1);
  });
});
