import { MissingParamsError } from '../errors/missing-params-error';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protoccols/controller';
import { HttpResponse, HttpRequest } from '../protoccols/http';

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'email',
      'name',
      'password',
      'passwordConfirmation',
    ];
    for (let field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field));
      }
    }
    return {
      body: 'a',
      statusCode: 400,
    };
  }
}
