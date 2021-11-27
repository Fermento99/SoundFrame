const auth = require('../../src/authoziration/authorization');
const { JsonWebTokenError } = require('jsonwebtoken');
const assert = require('assert');


describe('Authorization', () => {
  before(() => {
    process.env.ACCESS_TOKEN_SECRET = 'secretAcc'
    process.env.REFRESH_TOKEN_SECRET = 'secretAcc'
  });

  it('generates correct Access Token', () => {
    const givenId = 1;
    token = auth.genAccessToken(givenId);

    const retId = auth.verifyAccessToken(token);
    assert.equal(retId, givenId);
  });

  it('generates correct Refresh Token', () => {
    const givenId = 1;
    token = auth.genRefreshToken(givenId);

    const retId = auth.verifyRefreshToken(token);
    assert.equal(retId, givenId);
  });

  it('correctly invalidates Access Token', () => {
    const givenId = 1;
    token = auth.genAccessToken(givenId);
    token += 'a';
    assert.throws(() => auth.verifyAccessToken(token), JsonWebTokenError);
  });

  it('correctly invalidates Refresh Token', () => {
    const givenId = 1;
    token = auth.genRefreshToken(givenId);
    token += 'a';
    assert.throws(() => auth.verifyRefreshToken(token), JsonWebTokenError);
  });

});