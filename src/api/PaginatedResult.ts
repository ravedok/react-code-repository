export interface PaginatedResult<T> {
    total: number;
    page: number;
    totalPages: number;
    data: T[]
}