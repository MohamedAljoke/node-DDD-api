import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';
import env from './config/env';
import app from './config/app';

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    console.log('Mongodb is on');
    app.listen(env.port, () => console.log('Server is on'));
  })
  .catch(console.error);
