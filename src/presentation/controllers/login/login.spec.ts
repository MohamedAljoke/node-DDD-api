import {
  InvalidParamError,
  MissingParamsError,
  ServerError,
} from '../../errors';
import { EmailValidator } from '../signup/signup-protocols';
import { SignInController } from './login';

interface SutTypes {
  sut: SignInController;
  emailValidator: EmailValidator;
}

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
  const emailValidator = makeEmailValidator();
  const sut = new SignInController(emailValidator);
  return {
    sut,
    emailValidator,
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
    const { sut, emailValidator } = makeSut();
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false);
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
    const { sut, emailValidator } = makeSut();
    const isValidEmailSpy = jest.spyOn(emailValidator, 'isValid');
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
    const { sut, emailValidator } = makeSut();
    jest.spyOn(emailValidator, 'isValid').mockImplementationOnce(() => {
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
});
