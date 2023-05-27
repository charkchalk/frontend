interface PaginatedResponse<T = unknown> {
  totalPages: number;
  currentPage: number;
  content: T;
}
