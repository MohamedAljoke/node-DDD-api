import { InvalidParamError, MissingParamsError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import {
  Controller,
  EmialValidator,
  HttpResponse,
  HttpRequest,
} from '../protoccols';

export class SignUpController implements Controller {
  private readonly emailValidator: EmialValidator;
  constructor(emailValidator: EmialValidator) {
    this.emailValidator = emailValidator;
  }
  handle(httpRequest: HttpRequest): HttpResponse {
    try {
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
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
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
