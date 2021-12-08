import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Column, Row } from '../../components/Grid';
import Post from '../../components/post/Post';
import { createUrl, getData } from '../../utils/fetcher';
import { BtnLight } from '../../components/Button';
import NavBar from '../../components/NavBar';


const genComments = comments => {
  const out = [];
  comments.forEach(comment => out.push(<Post size=".5" post={comment} />));
  return out;
};

export default function PostPage() {
  const { id } = useParams();
  const url = createUrl('post', 'get', { id });
  const [post, setPost] = useState(null);
  const history = useHistory();

  if (!post && id) { getData(url).then(post => setPost(post)); }

  if (post) {
    return (
      <Column>
        <NavBar />
        <Post post={post.content}>
          Post
        </Post>
        <Row>
          <BtnLight onClick={() => history.push('/creator/' + id)}>COMMENT</BtnLight>
        </Row>
        <Row wrap>
          {genComments(post.comments)}
        </Row>
      </Column>
    );
  } else {
    return <div></div>;
  }
}
