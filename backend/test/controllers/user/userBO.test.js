const assert = require('assert');
const User = require('../../../src/dbmanager/models/user');
const Post = require('../../../src/dbmanager/models/post');
const UserBO = require('../../../src/controllers/user/userBO');
const { connect, disconnect } = require('../../dbmanager/connection.test');

describe('UserBO', () => {
  const userIds = [];
  const postIds = [];

  before(async () => {
    await connect();
    const exampleUsers = [
      {
        email: 'ex1@ex.com',
        username: 'example1',
        password: 'Byesword1',
        avatar: {
          front: 'A',
          colors: ['#FFFFFF'],
        }
      },
      {
        email: 'ex2@ex.com',
        username: 'example2',
        password: 'Byesword2',
        avatar: {
          front: 'B',
          colors: ['#FF0000', '#00FF00'],
        }
      },
    ];

    for (let i in exampleUsers) {
      const user = await User.create(exampleUsers[i]);
      userIds.push(user._id);
    }

    const examplePosts = [
      {
        content: {
          owner: userIds[0],
          spotifyId: '2GiJYvgVaD2HtM8GqD9EgQ',
          bgcolor: '#50FFEE',
          shape: 1,
          preferences: {},
        }
      },
      {
        content: {
          owner: userIds[1],
          spotifyId: '2GiJYvgVaD2HtM8GqD9EgQ',
          bgcolor: '#50FFEE',
          shape: 1,
          preferences: {},
        }
      },
    ];

    for (let i in examplePosts) {
      const post = await Post.create(examplePosts[i]);
      postIds.push(post._id);
    }
  });

  after(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    await disconnect();
  });

  it('adds user to observed', done => {
    UserBO.observeUser(userIds[0], userIds[1]).then(_ => {
      User.findById(userIds[0], 'observed').then(user => {
        assert.deepEqual(user.observed, [userIds[1]]);
        done();
      }).catch(err => done(err));
    }).catch(err => done(err));
  });

  it('doesn\'t duplicate observed', done => {
    UserBO.observeUser(userIds[0], userIds[1]).then(_ => {
      User.findById(userIds[0], 'observed').then(user => {
        assert.deepEqual(user.observed, [userIds[1]]);
        done();
      }).catch(err => done(err));
    }).catch(err => done(err));
  });

  it('gets users feed', done => {
    UserBO.getFeed(userIds[0]).then(feed => {
      assert.equal(feed.length, 1);
      assert(feed[0]._id.equals(postIds[1]));
      done();
    }).catch(err => done(err));
  });

  it('removes user form observed', done => {
    UserBO.unobserveUser(userIds[0], userIds[1]).then(_ => {
      User.findById(userIds[0], 'observed').then(user => {
        assert.deepEqual(user.observed, []);
        done();
      }).catch(err => done(err));
    }).catch(err => done(err));
  });


});