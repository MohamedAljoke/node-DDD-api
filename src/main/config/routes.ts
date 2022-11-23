import { Express, Request, Response, Router } from 'express';
import signUpRouter from '../routes/signup-routes';

export default (app: Express): void => {
  const mainRouter = Router();
  signUpRouter(mainRouter);
  mainRouter.get('/', (req: Request, res: Response) =>
    res.send(200).json({ api: 'API IS ON' })
  );
  app.use('/api/v1', mainRouter);
};
