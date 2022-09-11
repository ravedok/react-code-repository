import { PaginatedResult } from "./PaginatedResult";
import { apiUrl, itemsPerPage } from "../config";

export const getPaginatedResult = async <ClassType, JsonType>(
  resource: string,
  mapToEntityCallback: (json: JsonType) => Promise<ClassType>,
  page: number
): Promise<PaginatedResult<ClassType>> => {
  const start = itemsPerPage * (page - 1);
  const limit = itemsPerPage;

  const response = await fetch(
    `${apiUrl}/${resource}?_start=${start}&_limit=${limit}`
  );

  const totalItems = Number(response.headers.get("X-Total-Count"));
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const json: JsonType[] = await response.json();

  const mapData = async (
    data: JsonType[],
    fn: (json: JsonType) => Promise<ClassType>
  ) => {
    const results = [];

    for (const item of data) {
      results.push(await fn(item));
    }

    return results;
  };

  const data = await mapData(json, mapToEntityCallback);

  return {
    page: page,
    total: totalItems,
    totalPages,
    data,
  };
};
