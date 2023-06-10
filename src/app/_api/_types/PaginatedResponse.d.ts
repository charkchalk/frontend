interface PaginatedResponse<T = unknown> {
  content: T;
  currentPage: number;
  totalPages: number;
}
