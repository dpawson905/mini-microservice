/** @format */
const PORT = process.env.PORT || 4001;
const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.use(express.json({ limit: '10kb' }));

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res, next) => {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post('/posts/:id/comments', async (req, res, next) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  if (commentsByPostId[req.params.id] === undefined) return res.send([]);
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });
  res.status(201).send(comments);
});

app.post('/events', (req, res, next) => {
  console.log('Received Event', req.body.type);
  res.send({});
});

app.listen(PORT, () => console.log('Listening on port', PORT));
