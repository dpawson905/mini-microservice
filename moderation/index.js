/** @format */
const PORT = process.env.PORT || 4003;
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.post('/events', async (req, res, next) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    setTimeout(async () => {
      await axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      });
    }, 3000);
  }
  res.send({});
});

app.listen(PORT, () => console.log('Listening on port', PORT));
