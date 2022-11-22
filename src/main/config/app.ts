import express from 'express';
import setUpMiddleWares from './middlewares';
const app = express();
setUpMiddleWares(app);

export default app;
