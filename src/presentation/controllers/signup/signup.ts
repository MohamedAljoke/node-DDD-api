import { InvalidParamError, MissingParamsError } from '../../errors';
import { badRequest, created, serverError } from '../../helpers/http-helper';
import {
  Controller,
  EmialValidator,
  HttpRequest,
  HttpResponse,
  AddAccount,
} from './signup-protocols';

export class SignUpController implements Controller {
  private readonly emailValidator: EmialValidator;
  private readonly addAccount: AddAccount;
  constructor(emailValidator: EmialValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }
  handle(httpRequest: HttpRequest): HttpResponse {
    const { name, email, password, passwordConfirmation } = httpRequest.body;
    try {
      //validate params
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
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const isValidEmail = this.emailValidator.isValid(email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }
      //add acount
      const newAccount = this.addAccount.add({ name, email, password });
      const response = created(newAccount);

      return response;
    } catch (e) {
      return serverError();
    }
  }
}
