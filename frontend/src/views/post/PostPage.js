import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Column, Row } from '../../components/Grid';
import Post from '../../components/post/Post';
import { createUrl, getData } from '../../utils/fetcher';


const genComments = comments => {
  const out = [];
  comments.forEach(comment => out.push(<Post size=".5" post={comment} />))
  return out;
}

export default function PostPage() {
  const { id } = useParams();
  const url = createUrl('post', 'get', { id });
  const [post, setPost] = useState(null);

  if (!post && id) { getData(url).then(post => setPost(post)); }
  
  if (post) {
    return (
      <Column>
        <Post post={post.content}>
          Post
        </Post>
        <Row wrap>
          {genComments(post.comments)}
        </Row>
      </Column>
    );
  } else {
    return <div></div>;
  }
}
