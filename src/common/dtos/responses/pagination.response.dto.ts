export class PaginationResponseDto<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
