import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CourseQueryManagerService {
  queries: unknown[] = [{}];
  private queriesSubject = new BehaviorSubject<unknown[]>(this.queries);

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
