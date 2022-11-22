import request from 'supertest';
import app from '../config/app';

describe('Body Parser Middleware', () => {
  test('Should parse body with body parser', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test-body-parser')
      .send({ data: 'teste-data' })
      .expect({ data: 'teste-data' });
  });
});
