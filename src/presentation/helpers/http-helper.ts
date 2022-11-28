import { ServerError, UnauthorizedError } from '../errors';
import { HttpResponse } from '../protoccols/http';
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});
export const unauthorizedRequest = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});
export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

export const created = <T>(data: T): HttpResponse => {
  return {
    statusCode: 201,
    body: data,
  };
};

export const ok = (data): HttpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};
