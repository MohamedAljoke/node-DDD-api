import { InvalidParamError, MissingParamsError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protoccols';
import { EmailValidator } from '../signup/signup-protocols';

export class SignInController implements Controller {
  private readonly emailValidator: EmailValidator;
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
    return new Promise((resolve) => resolve({ statusCode: 200, body: {} }));
  }
}
