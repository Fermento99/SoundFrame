const User = require('../../../src/dbmanager/models/user');
const { connect, disconnect } = require('../connection.test');

describe('MongoDB User Model', () => {
  before(async() => await connect());
  after(async() => {
    await User.deleteMany({});
    await disconnect();
  })

  it('creates user', done => {
    User.create({
      username: 'Test',
      password: 'Pass',
      email: 'eex@ex.pl',
    }).then(_ => done())
      .catch(err => done(err));
  });

  it('doesn\'t allow duplpicate username', done => {
    userObj = {
      username: 'Test',
      email: 'eex2@ex.pl',
      pass: 'secretPassword123',
    };

    User.create(userObj)
      .then(_ => done('does anyway'))
      .catch(_ => done())
  })

  it('doesn\'t allow duplpicate email', done => {
    userObj = {
      username: 'Test2',
      email: 'eex@ex.pl',
      pass: 'secretPassword123',
    };

    User.create(userObj)
      .then(_ => done('does anyway'))
      .catch(_ => done())
  })
});
