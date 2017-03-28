require('mocha');
var assert = require('chai').assert;
var crypto = require('./index');

describe('bip39', function () {
  it('bip39.generateMnemonic', function () {
    assert.equal(crypto.bip39.generateMnemonic().split(' ').length, 12, 'should generate 12 words');
  });
});
describe('bitcoinjs-lib', function () {
  it('bitcoinjs-lib.HDNode', function () {
    var mnemonic = crypto.bip39.generateMnemonic();
    var seed = crypto.bip39.mnemonicToSeed(mnemonic, '');
    var pk = crypto.bitcoin.HDNode.fromSeedBuffer(seed, crypto.bitcoin.networks.bitcoin);
    assert.ok(pk.keyPair.compressed, 'should generate a private key');
  });
});
