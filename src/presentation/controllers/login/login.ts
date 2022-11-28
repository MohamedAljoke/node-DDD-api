import { Authentication } from '../../../domain/usecases/authentication';
import { InvalidParamError, MissingParamsError } from '../../errors';
import { badRequest, serverError } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protoccols';
import { EmailValidator } from '../signup/signup-protocols';

export class SignInController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly authentication: Authentication;
  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      const reqRequiredData = ['email', 'password'];
      for (let field of reqRequiredData) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field));
        }
      }
      const isValidEmail = this.emailValidator.isValid(email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }
      this.authentication.auth(email, password);
      return new Promise((resolve) => resolve({ statusCode: 200, body: {} }));
    } catch (e) {
      return serverError();
    }
  }
}
