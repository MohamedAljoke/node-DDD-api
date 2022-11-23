import express from 'express';
import setUpMiddleWares from './middlewares';
import setUpRoutes from './routes';
const app = express();
setUpMiddleWares(app);
setUpRoutes(app);
export default app;
