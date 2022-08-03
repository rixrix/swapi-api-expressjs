import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/resource/:resource', (req, res) => {
  res.send(`Hello ${req.params.resource}`);
});

app.use('/health', (_, res) => {
    res.send('OK');
});

export default app
