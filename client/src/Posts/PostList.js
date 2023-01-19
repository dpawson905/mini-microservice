/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from '../Comments/CommentCreate';
import CommentList from '../Comments/CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/posts');
      setPosts(res.data);
    } catch (err) {
      throw new Error({ error: err });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}>
        <div className='card-body'>
          <h5 className='card-title'>{post.title}</h5>
          <CommentList postId={post.id} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPosts}
    </div>
  );
};

export default PostList;
