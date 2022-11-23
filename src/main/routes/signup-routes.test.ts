import request from 'supertest';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';

describe('SignUp Routes', () => {
  beforeAll(async () => {
    const mongoClient = await MongoHelper.connect(process.env.MONGO_URL!);
  });
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });
  afterAll(async () => {
    await MongoHelper.desconnect();
  });
  test('Should return account on sucess', async () => {
    const data = {
      name: 'random_name',
      email: 'mohammed.maljoke@gmail.com',
      password: '123123',
      passwordConfirmation: '123123',
    };
    await request(app).post('/api/v1/signup').send(data).expect(201);
  });
});
