import { MissingParamsError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protoccols';

export class SignInController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;
    const reqRequiredData = ['email', 'password'];
    for (let field of reqRequiredData) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field));
      }
    }
    return new Promise((resolve) => resolve({ statusCode: 200, body: {} }));
  }
}
