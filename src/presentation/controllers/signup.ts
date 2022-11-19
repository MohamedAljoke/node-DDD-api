import { InvalidParamError } from '../errors/invalid-param-error';
import { MissingParamsError } from '../errors/missing-params-error';
import { ServerError } from '../errors/server-error';
import { badRequest, serverError } from '../helpers/http-helper';
import { Controller } from '../protoccols/controller';
import { EmialValidator } from '../protoccols/email-validator';
import { HttpResponse, HttpRequest } from '../protoccols/http';

export class SignUpController implements Controller {
  private readonly emailValidator: EmialValidator;
  constructor(emailValidator: EmialValidator) {
    this.emailValidator = emailValidator;
  }
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
    try {
      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }
      return {
        body: 'a',
        statusCode: 400,
      };
    } catch (e) {
      return serverError();
    }
  }
}
