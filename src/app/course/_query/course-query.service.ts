import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { QueryDataProvider } from "./query-data-provider";
import { KeywordQueryDataProviderService } from "./query-data-providers/keyword-query-data-provider/keyword-query-data-provider.service";
import { TeacherQueryDataProviderService } from "./query-data-providers/teacher-query-data-provider/teacher-query-data-provider.service";
import { QueryItem } from "./query-item";

@Injectable({
  providedIn: "root",
})
export class CourseQueryService {
  providers: QueryDataProvider[] = [];

  constructor(
    keywordQueryDataProviderService: KeywordQueryDataProviderService,
    teacherQueryDataProviderService: TeacherQueryDataProviderService,
  ) {
    this.providers.push(keywordQueryDataProviderService);
    this.providers.push(teacherQueryDataProviderService);
  }

  getProviders(): QueryDataProvider[] {
    return this.providers;
  }

  getProvider(key: string): QueryDataProvider | undefined {
    return this.providers.find(queryable => queryable.key === key);
  }

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

  setQuery(index: number, query: QueryItem) {
    this.queries[index] = query;
    this.queriesSubject.next(this.queries);
  }

  removeQuery(index: number) {
    this.queries.splice(index, 1);
    this.queriesSubject.next(this.queries);
  }
}