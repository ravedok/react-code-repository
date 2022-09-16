import { PaginatedResult } from "./PaginatedResult";
import { apiUrl, itemsPerPage } from "../config";
import { handleHttpErrorFromResponse } from "./HttpErrors";

const mapDataFromResponse = async <ClassType, JsonType>(
  response: Response,
  mapToEntityCallback: (json: JsonType) => Promise<ClassType>
) => {
  const json: JsonType[] = await response.json();

  const results = [];

  for (const item of json) {
    results.push(await mapToEntityCallback(item));
  }

  return results;
};

const getPaginatedResponseWithQuery = async (
  resource: string,
  page: number,
  query: string
): Promise<Response> => {
  const start = itemsPerPage * (page - 1);
  const limit = itemsPerPage;

  return fetch(
    `${apiUrl}/${resource}?_start=${start}&_limit=${limit}&q=${query}`
  );
};

const getTotalItemsFromResponse = (response: Response): number => {
  return Number(response.headers.get("X-Total-Count"));
};

export const getPaginatedResult = async <ClassType, JsonType>(
  resource: string,
  mapToEntityCallback: (json: JsonType) => Promise<ClassType>,
  page: number,
  query: string
): Promise<PaginatedResult<ClassType>> => {
  const response = await getPaginatedResponseWithQuery(resource, page, query);

  handleHttpErrorFromResponse(response);

  const totalItems = getTotalItemsFromResponse(response);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const data = await mapDataFromResponse(response, mapToEntityCallback);

  return {
    page: page,
    total: totalItems,
    totalPages,
    data,
  };
};
