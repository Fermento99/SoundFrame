const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('./authBO');
const { genAccessToken, genRefreshToken, verifyRefreshToken } = require('../../authoziration/tokenAuth');


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
        ? res.status(200).json({ user: userData, accessToken: genAccessToken(user._id), refreshToken: genRefreshToken(user._id) })
        : res.status(401).json({ message: 'wrong username or password' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: err });
    });
});

router.post('/refresh', (req, res) => {
  console.log('refreshing access token');

  try {
    const userId = verifyRefreshToken(req.body.token);
    const accTok = genAccessToken(userId);
    const refTok = genRefreshToken(userId);
    res.status(200).json({ accessToken: accTok, refreshToken: refTok });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: err });
  }
});


module.exports = router;