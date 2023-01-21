interface StandardResponse<T> {
  totalPages: number;
  currentPage: number;
  content: T;
}
