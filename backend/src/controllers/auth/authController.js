const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('./authBO');
const { genAccessToken, genRefreshToken, verifyRefreshToken } = require('../../authoziration/tokenAuth');
const authHelper = require('./authHelper');


router.post('/register', (req, res) => {
  console.log('registering user');

  createUser(req.body.user).then(user => {
    if (user._id) {
      const userData = authHelper(user);
      res.status(200).json({ user: userData, accessToken: genAccessToken(user._id), refreshToken: genRefreshToken(user._id) });
    } else {
      res.status(400).json({ message: user });
    }
  }).catch(err => res.status(400).json({ message: err }));
});

router.post('/login', (req, res) => {
  console.log('user loging in');

  loginUser(req.body.user)
    .then(user => {
      if (user) {
        const userData = authHelper(user);
        res.status(200).json({ user: userData, accessToken: genAccessToken(user._id), refreshToken: genRefreshToken(user._id) });
      } else {
        res.status(401).json({ message: 'wrong username or password' });
      }
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