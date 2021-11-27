const User = require('../../../src/dbmanager/models/user');
const UserBO = require('../../../src/controllers/user/userBO');
const { connect, disconnect } = require('../../dbmanager/connection.test');

describe('UserBO', () => {
  before(async () => await connect());
  after(async () => {
    await User.deleteMany({})
    await disconnect();
  })

  it('registers new User', done => {
    userObj = {
      username: 'somename',
      email: 'example@gmail.com',
      pass: 'secretPassword123',
      pass2: 'secretPassword123',
    };

    UserBO.createUser(userObj)
      .then(_ => done())
      .catch(err => done(err))
  })

  it('logins user on correct password', done => {
    userObj = {
      email: 'example@gmail.com',
      pass: 'secretPassword123',
    }

    UserBO.loginUser(userObj)
      .then(userId => userId !== false ? done() : done('wrong user password'))
      .catch(err => done(err));
  })

  it('doesn\'t login user with wrong password', done => {
    userObj = {
      email: 'example@gmail.com',
      pass: 'butterisnopassword',
    }

    UserBO.loginUser(userObj)
      .then(userId => userId !== false ? done('logged anyway') : done())
      .catch(_ => done());
  })


})