/** @format */
const PORT = process.env.PORT || 4005;
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json({ limit: '10kb' }));

const events = [];

app.post('/events', async (req, res, next) => {
  const event = req.body;
  events.push(event);
  await axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err);
  });
  await axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err);
  });
  await axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err);
  });
  await axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log(err);
  });
  res.send({ status: 'ok' });

  app.get('/events', (req, res) => {
    res.send(events);
  });
});

app.listen(PORT, () => console.log('Listening on port', PORT));
