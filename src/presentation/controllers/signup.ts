import { MissingParamsError } from '../errors/missing-params-error';
import { HttpResponse, HttpRequest } from '../protoccols/http';
export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        body: new MissingParamsError('name'),
        statusCode: 400,
      };
    }
    if (!httpRequest.body.email) {
      return {
        body: new MissingParamsError('email'),
        statusCode: 400,
      };
    } else {
      return {
        body: 'a',
        statusCode: 400,
      };
    }
  }
}
