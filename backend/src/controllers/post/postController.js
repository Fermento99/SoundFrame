const express = require('express');
const router = express.Router();
const { getTokenFromHeaders } = require('../../authoziration/headerAuth');
const { verifyAccessToken } = require('../../authoziration/tokenAuth');
const PostBO = require('./postBO');


router.post('/new', (req, res) => {
  console.log('new post');

  try {
    const token = getTokenFromHeaders(req.headers);
    const userId = verifyAccessToken(token);
    PostBO.createPost(req.body.post, userId)
      .then(_ => res.status(204).send())
      .catch(err => { console.log(err); res.status(422).json({ message: err }); });
  } catch (err) {
    res.status(403).json({ message: err });
  }
});

router.get('/get', (req, res) => {
  console.log('getting posts');

  PostBO.getPosts(req.query)
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(err => res.status(422).json({ message: err }));
});

router.delete('/:id/delete', (req, res) => {
  console.log('deleting post');

  try {
    const token = getTokenFromHeaders(req.headers);
    const userId = verifyAccessToken(token);
    PostBO.deletePost(req.params.id, userId)
      .then(_ => res.status(204).send())
      .catch(err => res.status(404).json(err));
  } catch (err) {
    res.status(403).json({ message: err });
  }
});

router.post('/:id/comment', (req, res) => {
  console.log('adding comment');

  try {
    const token = getTokenFromHeaders(req.headers);
    const userId = verifyAccessToken(token);
    PostBO.addComment(req.params.id, req.body.comment, userId)
      .then(_ => res.status(204).send())
      .catch(err => res.status(404).json(err));
  } catch (err) {
    res.status(403).json({ message: err });
  }
});

router.post('/:id/react', (req, res) => {
  console.log('adding reaction');

  try {
    const token = getTokenFromHeaders(req.headers);
    const userId = verifyAccessToken(token);
    PostBO.addReaction(req.params.id, req.body.reaction, userId)
      .then(_ => res.status(204).send())
      .catch(err => { console.log(err); res.status(404).json(err); });
  } catch (err) {
    res.status(403).json({ message: err });
  }
});


module.exports = router;