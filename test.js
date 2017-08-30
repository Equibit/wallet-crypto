require('mocha');
var assert = require('chai').assert;
var crypto = require('./index');
var eqbTxBuilder = require('tx-builder-equibit/src/tx-builder-equibit');
var fixtureNode = require('tx-builder-equibit/test/fixtures/hdnode')

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
describe('tx-builder-equibit', function () {
  it('tx-builder-equibit.buildTx', function () {
		var keyPair = fixtureNode.keyPair
    var tx = {
			version: 1,
			locktime: 104,
			vin: [{
				hash: 'd7b0237b6b14d4b1a652d450a95c7c47c8b56b5e81d3452a5a579f129c3a5fca',
				index: 0,
				script: '',
				sequence: 4294967294
			}],
			vout: [{
				value: 1 * 100000000,
				address: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt',
				equibit: {
					payment_currency: 0,
					payment_tx_id: '',
					issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
					issuance_json: ''
				}
			}, {
				value: (25 - 1 - 0.0001) * 100000000,
				address: 'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna',
				equibit: {
					payment_currency: 0,
					payment_tx_id: '',
					issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
					issuance_json: ''
				}
			}]
		}
		tx.vin[0].keyPair = fixtureNode.keyPair;
    var buffer = eqbTxBuilder.buildTx(tx);
    assert.ok(buffer.toString('hex'), 'should build a transaction');
  });
});
