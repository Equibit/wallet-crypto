require('mocha')
var assert = require('chai').assert
var crypto = require('./index')
var randomBytes = require('./index').randomBytes
var eqbTxBuilder = require('tx-builder-equibit')
var fixtureNode = require('tx-builder-equibit/test/fixtures/hdnode')
require('tx-builder-equibit/test/playground/htlc')
var simpleHashlockSigContract = require('tx-builder-equibit/src/script-builder').simpleHashlockSigContract

describe('bip39', function () {
  it('bip39.generateMnemonic', function () {
    assert.equal(crypto.bip39.generateMnemonic().split(' ').length, 12, 'should generate 12 words')
  })
})

describe('bitcoinjs-lib', function () {
  it('bitcoinjs-lib.HDNode', function () {
    var mnemonic = crypto.bip39.generateMnemonic()
    var seed = crypto.bip39.mnemonicToSeed(mnemonic, '')
    var pk = crypto.bitcoin.HDNode.fromSeedBuffer(seed, crypto.bitcoin.networks.bitcoin)
    assert.ok(pk.keyPair.compressed, 'should generate a private key')
  })
})

describe('tx-builder-equibit', function () {
  var tx = {
    version: 1,
    locktime: 104,
    vin: [{
      txid: 'd7b0237b6b14d4b1a652d450a95c7c47c8b56b5e81d3452a5a579f129c3a5fca',
      vout: 0,
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
  var txid = 'f7d06259b369168013b2f00f2b3eadfd5abfab971555fc920d435395dd1a0056'
  var buffer
  before(function () {
    tx.vin[0].keyPair = fixtureNode.keyPair
    buffer = eqbTxBuilder.builder.buildTx(tx, {})
  })
  it('tx-builder-equibit.builder.buildTx', function () {
    assert.ok(buffer.toString('hex'), 'should build a transaction')
  })
  it('tx-builder-equibit.getTxId', function () {
    assert.equal(eqbTxBuilder.getTxId({})(buffer), txid, 'should get txid')
  })
})

describe('tx-builder', function () {
  it('should re-export `txBuilder` package', function () {
    assert.equal(typeof crypto.txBuilder, 'object')
  })
  it('should contain `txBuilder.decoder` object', function () {
    assert.equal(typeof crypto.txBuilder.decoder, 'object')
  })
  it('should contain `txBuilder.builder` object', function () {
    assert.equal(typeof crypto.txBuilder.builder, 'object')
  })
})

describe('wallet-message', function () {
  it('should contain `messagePow` method', function () {
    assert.equal(typeof crypto.walletMessage.messagePow, 'function')
  })
})

describe('randomBytes', function () {
  it('should return a random number of bytes', function () {
    assert.equal(randomBytes(32).length, 32)
  })
})

describe('types', function () {
  it('should re-export types from tx-builder', function () {
    assert.equal(typeof crypto.types.Address, 'function')
  })
})

describe('Buffer', function () {
  it('should re-export Buffer from safe-buffer', function () {
    assert.equal(typeof crypto.Buffer, 'function')
    assert.equal(Buffer.alloc(32).length, 32)
    assert.equal(Buffer.from('20', 'hex').toString('hex'), '20')
  })
})

describe('htlc script', function () {
  it('should run the script playground', function () {
    var hashSecret = '88f1f9dcce43d0aea877b6be5d5ed4b90a470b151ccab39bc8d57584e6be03c7'
    var addr = 'mzWJ35ui9iizfTiypu8Aq7oWPb6gWbRvTe'
    var htlcScript = simpleHashlockSigContract(addr, hashSecret)
    console.log(`htlcScript = ${htlcScript.toString('hex')}`)
    assert.ok(htlcScript)
  })
})
