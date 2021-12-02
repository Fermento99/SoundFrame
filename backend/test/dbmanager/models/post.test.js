const post = require('../../../src/dbmanager/models/post');
const Post = require('../../../src/dbmanager/models/post');
const User = require('../../../src/dbmanager/models/user');
const { connect, disconnect } = require('../connection.test');
const assert = require('assert');

let exampleUserId = 0;

describe('Post Model', () => {
  before(async () => {
    await connect();
    exampleUser = {
      email: 'ex@ex.com',
      username: 'example',
      password: 'Byesword',
      avatar: {
        front: 'A',
        colors: ['#FFFFFF'],
      }
    };
    await User.create(exampleUser).then(user => exampleUserId = user._id);
  });
  after(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
    await disconnect();
  });

  it('creates Post', done => {
    const postObj = {
      content: {
        owner: exampleUserId,
        spotifyID: '2GiJYvgVaD2HtM8GqD9EgQ',
        bgcolor: '#50FFEE',
        shape: 1,
        preferences: {},
      },
      comments: [
        {
          owner: exampleUserId,
          spotifyID: '2GiJYvgVaD2HtM8GqD9EgQ',
          bgcolor: '#50FFEE',
          shape: 1,
          preferences: {},
        },
        {
          owner: exampleUserId,
          spotifyID: '2GiJYvgVaD2HtM8GqD9EgQ',
          bgcolor: '#50FFEE',
          shape: 1,
          preferences: {},
        },
      ],
      reactions: [
        {
          type: 1,
          owner: exampleUserId,
        },
      ]
    };

    Post.create(postObj)
      .then(_ => done())
      .catch(err => done(err));
  });

  it('gets Post, comment and reaction owners\' avatars and names', done => {
    Post.findOne({})
      .then(post => {
        assert.ok(post.content.owner.username, 'content owner not populated');
        post.comments.forEach(comment => assert.ok(comment.owner.username, 'comment owner not populated'));
        post.reactions.forEach(reaction => assert.ok(reaction.owner.username, 'reaction owner not populated'));
        done();
      })
      .catch(err => done(err));
  });

  it('gets Posts with populated owners', done => {
    Post.find({})
      .then(posts => {
        posts.forEach(post => assert.ok(post.content.owner.username, 'content owner not populated'));
        done();
      })
      .catch(err => done(err));
  });

});