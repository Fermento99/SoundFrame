const assert = require('assert');
const User = require('../../../src/dbmanager/models/user');
const Post = require('../../../src/dbmanager/models/post');
const PostBO = require('../../../src/controllers/post/PostBO');
const { connect, disconnect } = require('../../dbmanager/connection.test');

describe('UserBO', () => {
  let exampleUserId;
  let createdPostId;
  const postIds = [];

  before(async () => {
    await connect();
    const exampleUser = {
      email: 'ex1@ex.com',
      username: 'example1',
      password: 'Byesword1',
      avatar: {
        front: 'A',
        colors: ['#FFFFFF'],
      }
    };
    const exampleUser2 = {
      email: 'ex2@ex.com',
      username: 'example2',
      password: 'Byesword2',
      avatar: {
        front: 'A',
        colors: ['#FFFFFF'],
      }
    };

    exampleUserId = (await User.create(exampleUser))._id;
    const ex2 = await User.create(exampleUser2);

    const examplePosts = [
      {
        content: {
          owner: exampleUserId,
          spotifyId: '2GiJYvgVaD2HtM8GqD9EgQ',
          bgcolor: '#FFFFFF',
          shape: 1,
          preferences: {},
        }
      },
      {
        content: {
          owner: exampleUserId,
          spotifyId: '2GiJYvgVaD2HtM8GqD9EgQ',
          bgcolor: '#000000',
          shape: 1,
          preferences: {},
        }
      },
      {
        content: {
          owner: exampleUserId,
          spotifyId: '2GiJYvgVaD2HtM8GqD9EgQ',
          bgcolor: '#000000',
          shape: 2,
          preferences: {},
        }
      },
      {
        content: {
          owner: exampleUserId,
          spotifyId: '2GiJYvgVaD2HtM8GqD9EgQ',
          bgcolor: '#FFFFFF',
          shape: 2,
          preferences: {},
        }
      },
      {
        content: {
          owner: ex2._id,
          spotifyId: '2GiJYvgVaD2HtM8GqD9EgQ',
          bgcolor: '#FFFFFF',
          shape: 2,
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
    await Post.deleteMany({});
    await User.deleteMany({});
    await disconnect();
  });

  it('creates Post', done => {
    const postObj = {
      spotifyId: 'notrealid',
      bgcolor: '#FFFFFF',
      shape: 2,
      preferences: {},
    };

    PostBO.createPost(postObj, exampleUserId).then(_ => {
      Post.findOne({ 'content.spotifyId': 'notrealid' }).then(post => {
        assert(post);
        createdPostId = post._id;
        done();
      }).catch(err => done(err));
    }).catch(err => done(err));
  });

  it('deletes Post', done => {
    PostBO.deletePost(createdPostId, exampleUserId)
      .then(_ => done())
      .catch(err => done(err));
  });

  it('gets Post by ID', done => {
    PostBO.getPosts({ id: postIds[0] }).then(post => {
      assert(post._id.equals(postIds[0]));
      done();
    }).catch(err => done(err));
  });

  it('gets user\'s Posts', done => {
    PostBO.getPosts({ userId: exampleUserId }).then(posts => {
      posts.forEach(post => {
        assert(post.content.owner._id.equals(exampleUserId));
      });
      done();
    }).catch(err => done(err));
  });

  it('filters posts by shape Post', done => {
    PostBO.getPosts({ shape: 1 }).then(posts => {
      posts.forEach(post => {
        assert.equals(post.content.shape, 1);
      });
      done();
    }).catch(err => done(err));
  });

  it('filters posts by color Post', done => {
    PostBO.getPosts({ bgcolor: "#FFFFFF" }).then(posts => {
      posts.forEach(post => {
        assert.equals(post.content.bgcolor, "#FFFFFF");
      });
      done();
    }).catch(err => done(err));
  });

  it('paginates returned posts', done => {
    PostBO.getPosts({ skip: 2, limit: 2 }).then(posts => {
      const page = postIds.slice(2, 4);
      posts.forEach((post, index) => {
        assert(post._id.equals(page[index]));
      });
      done();
    }).catch(err => done(err));
  });

  it('adds comment to Post', done => {
    const commentObj = {
      spotifyId: 'anothernotrealId',
      bgcolor: '#000000',
      shape: 7,
    };

    PostBO.addComment(postIds[0], commentObj, exampleUserId).then(_ => {
      Post.findOne({ _id: postIds[0], 'comments.spotifyId': 'anothernotrealId' }, 'comments.$').then(post => {
        assert.equal(post.comments.length, 1);
        done();
      }).catch(err => done(err));
    }).catch(err => done(err));
  });

  it('adds reaction to Post', done => {
    PostBO.addReaction(postIds[0], 1, exampleUserId).then(_ => {
      Post.findById(postIds[0], 'reactions').then(post => {
        assert.equal(post.reactions.length, 1);

        const { owner, type } = post.reactions[0];
        assert.equal(type, 1);
        assert(owner.equals(exampleUserId));
        done();
      }).catch(err => done(err));;
    }).catch(err => done(err));;
  });

  it('overrides reaction to Post', done => {
    PostBO.addReaction(postIds[0], 2, exampleUserId).then(_ => {
      Post.findById(postIds[0], 'reactions').then(post => {
        assert.equal(post.reactions.length, 1);

        const { owner, type } = post.reactions[0];
        assert.equal(type, 2);
        assert(owner.equals(exampleUserId));
        done();
      }).catch(err => done(err));;
    }).catch(err => done(err));;
  });
});