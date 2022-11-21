import express from 'express';

const app = express();

app.listen(process.env.PORT || 800, () => console.log('Server is on'));
