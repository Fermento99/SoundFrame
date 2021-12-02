const express = require('express');
const router = express.Router();
const UserBO = require('./userBO');
const { getTokenFromHeaders } = require('../../authoziration/headerAuth');
const { veifyAccessToken, verifyAccessToken } = require('../../authoziration/tokenAuth');

router.post('/observe/:id', (req, res) => {
  console.log('adding to observed');

  try {
    const token = getTokenFromHeaders(req.headers);
    const userId = verifyAccessToken(token);
    UserBO.observeUser(userId, req.params.id)
      .then(_ => res.status(204).send())
      .catch(err => res.status(422).json({ message: err }));
  } catch (err) {
    res.status(403).json({ message: err });
  }
});

router.post('/unobserve/:id', (req, res) => {
  console.log('removing from observed');

  try {
    const token = getTokenFromHeaders(req.headers);
    const userId = verifyAccessToken(token);
    UserBO.unobserveUser(userId, req.params.id)
      .then(_ => res.status(204).send())
      .catch(err => res.status(422).json({ message: err }));
  } catch (err) {
    res.status(403).json({ message: err });
  }
});

module.exports = router;