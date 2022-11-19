import { MissingParamsError } from '../errors/missing-params-error';
import { badRequest } from '../helpers/http-helper';
import { HttpResponse, HttpRequest } from '../protoccols/http';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamsError('name'));
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamsError('email'));
    } else {
      return {
        body: 'a',
        statusCode: 400,
      };
    }
  }
}
