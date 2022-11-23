import request from 'supertest';
import app from '../config/app';

describe('SignUp Routes', () => {
  test('Should return account on sucess', async () => {
    const data = {
      name: 'random_name',
      email: 'mohammed.maljoke@gmail.com',
      password: '123123',
      passwordConfirmation: '123123',
    };
    await request(app)
      .post('/api/v1/signup')
      .send({ data: 'teste-data' })
      .expect(200);
  });
});
