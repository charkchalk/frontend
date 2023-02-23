import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CourseQueryManagerService {
  queries: QueryItem[] = [{}];
  private queriesSubject = new BehaviorSubject<QueryItem[]>(this.queries);

  getQueries(): Observable<QueryItem[]> {
    return this.queriesSubject.asObservable();
  }

  getQuery(index: number): QueryItem {
    return this.queriesSubject.value[index];
  }

  addQuery() {
    this.queries.push({});
    this.queriesSubject.next(this.queries);
  }

  updateQuery(index: number, query: QueryItem) {
    this.queries[index] = query;
    this.queriesSubject.next(this.queries);
  }

  removeQuery(index: number) {
    this.queries.splice(index, 1);
    this.queriesSubject.next(this.queries);
  }
}
