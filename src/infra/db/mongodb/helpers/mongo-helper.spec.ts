import { MongoHelper } from './mongo-helper';

describe('Mongo Helper', () => {
  const sut = MongoHelper;
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL!);
  });
  afterAll(async () => {
    await sut.desconnect();
  });
  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
    await sut.desconnect();
    accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
  });
});
