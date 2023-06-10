/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from "@angular/core";
import { type ParamMap } from "@angular/router";
import { BehaviorSubject, type Observable } from "rxjs";

import { QueryDataProvider } from "./query-data-provider";
import { CodeQueryDataProviderService } from "./query-data-providers/code-query-data-provider/code-query-data-provider.service";
import { CreditQueryDataProviderService } from "./query-data-providers/credit-query-data-provider/credit-query-data-provider.service";
import { DateRangeQueryDataProviderService } from "./query-data-providers/date-range-query-data-provider/date-range-query-data-provider.service";
import { HostQueryDataProviderService } from "./query-data-providers/host-query-data-provider/host-query-data-provider.service";
import { KeywordQueryDataProviderService } from "./query-data-providers/keyword-query-data-provider/keyword-query-data-provider.service";
import { OrganizationQueryDataProviderService } from "./query-data-providers/organization-query-data-provider/organization-query-data-provider.service";
import { PlaceQueryDataProviderService } from "./query-data-providers/place-query-data-provider/place-query-data-provider.service";
import { TagQueryDataProviderService } from "./query-data-providers/tag-query-data-provider/tag-query-data-provider.service";
import { TimeRangeQueryDataProviderService } from "./query-data-providers/time-range-query-data-provider/time-range-query-data-provider.service";
import { QueryItem } from "./query-item";

@Injectable({
  providedIn: "root",
})
export class CourseQueryService {
  providers: QueryDataProvider[] = [];

  constructor(
    keywordQueryDataProviderService: KeywordQueryDataProviderService,
    creditQueryDataProviderService: CreditQueryDataProviderService,
    hostQueryDataProviderService: HostQueryDataProviderService,
    codeQueryDataProviderService: CodeQueryDataProviderService,
    organizationQueryDataProviderService: OrganizationQueryDataProviderService,
    placeQueryDataProviderService: PlaceQueryDataProviderService,
    tagQueryDataProviderService: TagQueryDataProviderService,
    dateRangeQueryDataProviderService: DateRangeQueryDataProviderService,
    timeRangeQueryDataProviderService: TimeRangeQueryDataProviderService,
  ) {
    this.providers.push(keywordQueryDataProviderService);
    this.providers.push(creditQueryDataProviderService);
    this.providers.push(hostQueryDataProviderService);
    this.providers.push(codeQueryDataProviderService);
    this.providers.push(organizationQueryDataProviderService);
    this.providers.push(placeQueryDataProviderService);
    this.providers.push(tagQueryDataProviderService);
    this.providers.push(dateRangeQueryDataProviderService);
    this.providers.push(timeRangeQueryDataProviderService);
  }

  getProviders(): QueryDataProvider[] {
    return this.providers;
  }

  getProvider(key: string): QueryDataProvider | undefined {
    return this.providers.find(queryable => queryable.value === key);
  }

  queries: QueryItem<unknown>[] = [{}];

  private queriesSubject = new BehaviorSubject<QueryItem<unknown>[]>(
    this.queries,
  );

  getQueries(): Observable<QueryItem<unknown>[]> {
    return this.queriesSubject.asObservable();
  }

  getQuery(index: number): QueryItem<unknown> {
    return this.queriesSubject.value[index];
  }

  addQuery(query: QueryItem<unknown> = {}) {
    this.queries.push(query);
    this.queriesSubject.next(this.queries);
  }

  setQuery(index: number, query: QueryItem<unknown>) {
    this.queries[index] = query;
    this.queriesSubject.next(this.queries);
  }

  removeQuery(index: number) {
    this.queries.splice(index, 1);
    this.queriesSubject.next(this.queries);
  }

  clearQueries() {
    this.queries = [];
    this.queriesSubject.next(this.queries);
  }

  removeEmptyQueries() {
    this.queries = this.queries.filter(
      query => query.key && query.method && query.value?.length,
    );

    this.queriesSubject.next(this.queries);
  }

  serializeQueries(): { [key: string]: string[] } {
    const params: { [key: string]: string[] } = {};

    this.queries.forEach(query => {
      if (!query.key || !query.method || !query.value?.length) return;
      if (!params[query.key]) params[query.key] = [];
      const provider = this.getProvider(query.key);

      if (!provider) return;

      const existingIndex = params[query.key].findIndex(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value => value.startsWith(query.method!),
      );

      if (existingIndex > -1) {
        params[query.key][existingIndex] = provider.appendSerializedQuery(
          params[query.key][existingIndex],
          query,
        );
      } else {
        params[query.key].push(provider.serializeQuery(query));
      }
    });

    return params;
  }

  async deserializeQueries(
    paramMap: ParamMap,
    save = true,
  ): Promise<QueryItem<unknown>[]> {
    if (save) this.clearQueries();

    const queries: QueryItem<unknown>[] = [];
    const providers = this.providers.map(displayable => {
      const provider = this.getProvider(displayable.value);

      if (!provider) return null;
      const values = paramMap.getAll(displayable.value);

      const queryParsers = values.map(async value => {
        queries.push(await provider.deserializeQuery(value));
      });

      return Promise.all(queryParsers);
    });

    await Promise.all(providers).then(() => this.removeEmptyQueries());

    if (save) {
      this.queries = queries;
      this.queriesSubject.next(this.queries);
    }

    return queries;
  }
}
