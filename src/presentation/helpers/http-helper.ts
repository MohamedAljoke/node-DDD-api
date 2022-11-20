import { ServerError } from '../errors/server-error';
import { HttpResponse } from '../protoccols/http';
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
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
