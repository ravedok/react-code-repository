import { PaginatedResult } from "./PaginatedResult";
import { apiUrl, itemsPerPage } from "../config";

export const getPaginatedResult = async <ClassType, JsonType>(
  resource: string,
  mapToEntityCallback: (json: JsonType) => ClassType,
  page: number
): Promise<PaginatedResult<ClassType>> => {
  const start = itemsPerPage * (page - 1);
  const limit = itemsPerPage;

  const response = await fetch(
    `${apiUrl}/${resource}?_start=${start}&_limit=${limit}`
  );

  const totalItems = Number(response.headers.get("X-Total-Count"));
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const data: JsonType[] = await response.json();

  return {
    page: page,
    total: totalItems,
    totalPages,
    data: data.map((item) => mapToEntityCallback(item)),
  };
};
