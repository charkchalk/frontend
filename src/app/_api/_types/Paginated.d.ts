interface Paginated<T = unknown> {
  content: T;
  pagination: PaginationStat;
}
