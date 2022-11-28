import { Authentication } from '../../../domain/usecases/authentication';
import {
  InvalidParamError,
  MissingParamsError,
  ServerError,
} from '../../errors';
import { EmailValidator } from '../signup/signup-protocols';
import { SignInController } from './login';

interface SutTypes {
  sut: SignInController;
  emailValidatorStub: EmailValidator;
  authenticationStub: Authentication;
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(email: string, password: string): Promise<string> {
      return 'any_token';
    }
  }
  return new AuthenticationStub();
};
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  return emailValidatorStub;
};
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const authenticationStub = makeAuthentication();
  const sut = new SignInController(emailValidatorStub, authenticationStub);
  return {
    sut,
    emailValidatorStub,
    authenticationStub,
  };
};
describe('LoginController', () => {
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
  test('Should return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'random_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });
  test('Should call email validator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidEmailSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'random_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(isValidEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
  test('Should throw if email validator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'random_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'valid_password',
      },
    };
    await sut.handle(httpRequest);
    expect(authSpy).toHaveBeenCalledWith(
      'valid_email@mail.com',
      'valid_password'
    );
  });
});
