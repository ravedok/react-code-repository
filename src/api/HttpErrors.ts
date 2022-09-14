export const NOT_FOUND_ERROR_MESSAGE =
  "The resource you requested was not found.";
export const INTERNAL_SERVER_ERROR_MESSAGE = "An unhandled error has occurred.";

export enum HttpErrorCodes {
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export class NotFoundHttpError extends Error {
  constructor() {
    super(NOT_FOUND_ERROR_MESSAGE);
  }
}

export class InternalServerHttpError extends Error {
  constructor() {
    super(INTERNAL_SERVER_ERROR_MESSAGE);
  }
}

export const handleHttpErrorFromResponse = (response: Response): void => {
  if (response.ok) {
    return;
  }

  if (response.status === HttpErrorCodes.NOT_FOUND) {
    throw new NotFoundHttpError();
  }

  throw new InternalServerHttpError();
};
