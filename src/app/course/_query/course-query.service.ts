import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { QueryDataProvider } from "./query-data-provider";
import { HostQueryDataProviderService } from "./query-data-providers/host-query-data-provider/host-query-data-provider.service";
import { KeywordQueryDataProviderService } from "./query-data-providers/keyword-query-data-provider/keyword-query-data-provider.service";
import { QueryItem } from "./query-item";

@Injectable({
  providedIn: "root",
})
export class CourseQueryService {
  providers: QueryDataProvider[] = [];

  constructor(
    keywordQueryDataProviderService: KeywordQueryDataProviderService,
    hostQueryDataProviderService: HostQueryDataProviderService,
  ) {
    this.providers.push(keywordQueryDataProviderService);
    this.providers.push(hostQueryDataProviderService);
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

  addQuery(query: QueryItem = {}) {
    this.queries.push(query);
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

  clearQueries() {
    this.queries = [{}];
    this.queriesSubject.next(this.queries);
  }

  removeEmptyQueries() {
    this.queries = this.queries.filter(query => {
      return query.key && query.method && query.value?.length;
    });
    this.queriesSubject.next(this.queries);
  }

  convertToQueryParams(): { [key: string]: string[] } {
    const params: { [key: string]: string[] } = {};
    this.queries.forEach(query => {
      if (!query.key || !query.method || !query.value?.length) return;
      if (!params[query.key]) params[query.key] = [];
      const provider = this.getProvider(query.key);
      if (!provider) return;
      params[query.key].push(provider.stringifyQuery(query));
    });

    return params;
  }
}
