/** @format */
// imr
// sfc

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const fetchData = async (getPostId) => {
    const res = await axios.get(
      `http://localhost:4001/posts/${getPostId}/comments`
    );
    setComments(res.data);
  };
  useEffect(() => {
    fetchData(postId);
  }, [postId]);

  const renderedComments = comments.map(comment => {
    return <li key={comment.id}>{comment.content}</li>
  })
  return <ul>
    {renderedComments}
  </ul>;
};

export default CommentList;
