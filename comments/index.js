/** @format */
const PORT = process.env.PORT || 4001;
const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json({ limit: '10kb' }));

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res, next) => {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post('/posts/:id/comments', (req, res, next) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  if (commentsByPostId[req.params.id] === undefined) return res.send([]);
  res.status(201).send(comments);
});

app.listen(PORT, () => console.log('Listening on port', PORT));
