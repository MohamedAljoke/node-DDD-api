import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

class EncrypterStub {
  async encrypt(value: string): Promise<string> {
    return new Promise((resolve) => resolve('hashed_password'));
  }
}
interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
}
const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub();
  const sut = new DbAddAccount(encrypterStub);
  return {
    sut,
    encrypterStub,
  };
};
describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
  });
});
