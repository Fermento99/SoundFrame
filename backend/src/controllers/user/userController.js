const express = require('express');
const { createUser, loginUser } = require('./userBO');
const { genAccessToken, genRefreshToken, refresh, verifyRefreshToken } = require('../../authoziration/authorization');
const router = express.Router();

router.post('/register', (req, res) => {
  console.log('registering user');

  createUser(req.body.user)
    .then(_ => res.status(200).send())
    .catch(err => res.status(400).json({ message: err }));
});

router.post('/login', (req, res) => {
  console.log('user loging in');

  loginUser(req.body.user)
    .then(user => {
      userData = { id: user._id, email: user.email, username: user.username, avatar: user.avatar };
      user
        ? res.status(200).json({ user: userData, accessToken: genAccessToken({ userId: user._id }), refreshToken: genRefreshToken({ userId: user._id }) })
        : res.status(401).json({ message: 'wrong username or password' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: err })
    });
})

router.post('/refresh', (req, res) => {
  console.log('refreshing access token');

  try {
    const userId = verifyRefreshToken(req.body.token);
    const accTok = genAccessToken({ userId });
    const refTok = genRefreshToken({ userId });
    res.status(200).json({ accessToken: accTok, refreshToken: refTok });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: err })
  }
})

module.exports = router;