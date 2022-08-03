const express = require('express');
const cors = require('cors');
const compression = require('compression');
const { json, urlencoded } = require('body-parser');
const helmet = require('helmet');

const {
  healthController,
  accountController,
  uploadController,
} = require('./controllers');

const app = express();

app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet());

app.use('/health', healthController.healthResponse);
app.get('/account/:accountID', accountController.getAccount);
app.get('/upload/:accountID', uploadController.getUploadUrl);

module.exports = app;
