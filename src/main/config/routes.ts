import { Express, Router } from 'express';
import fg from 'fast-glob';

export default (app: Express): void => {
  const mainRouter = Router();
  app.use('/api/v1', mainRouter);
  fg.sync('**/src/main/routes/**routes.ts').map(async (file) => {
    const route = (await import(`../../../${file}`)).default;
    route(mainRouter);
  });
};
