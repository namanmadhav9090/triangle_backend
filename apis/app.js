import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Use routes

app.use('/api', routes);

export default app;
