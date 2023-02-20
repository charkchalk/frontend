import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CourseQueryManagerService {
  queries: unknown[] = [];
  private queriesSubject = new Subject<unknown[]>();

  getQueries(): Observable<unknown[]> {
    return this.queriesSubject.asObservable();
  }

  addQuery() {
    this.queries.push({});
    this.queriesSubject.next(this.queries);
  }

  removeQuery(index: number) {
    this.queries.splice(index, 1);
    this.queriesSubject.next(this.queries);
  }
}
