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

app.use('/search/all', async (req, res) => {
  try {
    const { query } = req.query;
    const result = await axios.all([
      axios.get(`${process.env.SWAPI_URL}/people/?search=${query}`),
      axios.get(`${process.env.SWAPI_URL}/planets/?search=${query}`),
      axios.get(`${process.env.SWAPI_URL}/species/?search=${query}`),
      axios.get(`${process.env.SWAPI_URL}/vehicles/?search=${query}`),
    ]);
    const data = result.map((response) => response.data.results);
    res.json({
      people: result[0].data.results,
      planets: result[1].data.results,
      species: result[2].data.results,
      vehicles: result[3].data.results,
    });
  } catch (error) {
    res.status(500).json({ message: 'There was an internal server error while processing your request. Please try again' });
  }
});

app.use('/resource/:resource', async (req, res) => {
  try {
    const { resource } = req.params;
    const { data } = await axios.get(`${process.env.SWAPI_URL}/${resource}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'There was an internal server error while processing your request. Please try again' });
  }
});

app.use('/health', (_, res) => {
    res.send('OK');
});

export default app
