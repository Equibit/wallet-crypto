require('mocha');
var assert = require('chai').assert;
var crypto = require('./index');

describe('test', function () {
  it('should have bip39', function () {
    assert.ok(!!crypto.bip39.generateMnemonic);
  });
});
