require('mocha');
var assert = require('chai').assert;
var crypto = require('./index');

describe('bip39', function () {
  it('bip39.generateMnemonic', function () {
    assert.equal(crypto.bip39.generateMnemonic().split(' ').length, 12, 'should generate 12 words');
  });
});
