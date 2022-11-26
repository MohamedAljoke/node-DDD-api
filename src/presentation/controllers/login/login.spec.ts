import { MissingParamsError } from '../../errors';
import { SignInController } from './login';

interface SutTypes {
  sut: SignInController;
}

describe('LoginController', () => {
  const makeSut = (): SutTypes => {
    const sut = new SignInController();
    return {
      sut,
    };
  };
  test('Should return 400 if no email is provided ', async () => {
    const httpRequest = {
      body: {
        password: 'random_password',
      },
    };
    const { sut } = makeSut();
    const httpRespose = await sut.handle(httpRequest);
    expect(httpRespose.statusCode).toBe(400);
    expect(httpRespose.body).toEqual(new MissingParamsError('email'));
  });
  test('Should return 400 if no password is provided', async () => {
    const httpRequest = {
      body: {
        email: 'random_email',
      },
    };
    const { sut } = makeSut();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamsError('password'));
  });
});
