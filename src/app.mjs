import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/resource/:resource', async (req, res) => {
  const { resource } = req.params;
  const { data } = await axios.get(`${process.env.SWAPI_URL}/${resource}`);
  res.json(data);
});

app.use('/health', (_, res) => {
    res.send('OK');
});

export default app
