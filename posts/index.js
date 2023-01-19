/** @format */
const PORT = process.env.PORT || 4000;
const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json({ limit: "10kb" }));

const posts = {};

app.get('/posts', (req, res, next) => {
  res.send(posts);
});
app.post('/posts', (req, res, next) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  res.status(201).send(posts[id]);
});

app.listen(PORT, () => console.log('Listening on port', PORT));
