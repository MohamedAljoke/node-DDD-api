import { rejects } from 'assert';
import bcrypt from 'bcrypt';
import { resolve } from 'path';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hashed_value'));
  },
}));
interface SutType {
  sut: BcryptAdapter;
  salt: number;
}
const makeSut = (): SutType => {
  const salt = 12;
  const sut = new BcryptAdapter(salt);
  return { salt, sut };
};
describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const { salt, sut } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
  test('Should return hashed value on sucess', async () => {
    const { sut } = makeSut();
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hashed_value');
  });
  test('Should  throw if bcrypt throws', async () => {
    const { sut } = makeSut();

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.encrypt('any_value');
    expect(promise).rejects.toThrow();
  });
});
