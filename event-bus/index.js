/** @format */
const PORT = process.env.PORT || 4005;
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.post('/events', async (req, res, next) => {
  const event = req.body;

  await axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err)
  });
  await axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err)
  });
  await axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err)
  });
  res.send({ status: 'ok' });
});

app.listen(PORT, () => console.log('Listening on port', PORT));
