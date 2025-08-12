// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const sousEnsemblesRouter = require('./routes/sousEnsembles.routes');
const operationsRouter = require('./routes/operations.routes');
const interventionsRouter = require('./routes/interventions.routes');
const enginsRouter = require('./routes/engins.routes');
const respoRouter = require('./routes/responsable.routes')

app.use('/api/engins', enginsRouter);
app.use('/api/sous-ensembles', sousEnsemblesRouter);
app.use('/api/operations', operationsRouter);
app.use('/api/interventions', interventionsRouter);
app.use('/api/responsables',respoRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Test route
app.get('/', (req, res) => {
  res.send('Engins API is running');
});

module.exports = app;