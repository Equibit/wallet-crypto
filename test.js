require('mocha')
const assert = require('chai').assert
const crypto = require('./index')
const randomBytes = require('./index').randomBytes
const eqbTxBuilder = require('tx-builder-equibit')
const fixtureNode = require('tx-builder-equibit/test/fixtures/hdnode')
require('tx-builder-equibit/test/playground/htlc')
const simpleHashlockSigContract = require('tx-builder-equibit/src/script-builder').simpleHashlockSigContract

describe('bip39', function () {
  it('bip39.generateMnemonic', function () {
    assert.equal(crypto.bip39.generateMnemonic().split(' ').length, 12, 'should generate 12 words')
  })
})

describe('bitcoinjs-lib', function () {
  it('should have bitcoinjs-lib.ECPair', function () {
    assert.equal(typeof crypto.bitcoin.ECPair, 'object')
    assert.equal(typeof crypto.bitcoin.ECPair.fromPrivateKey, 'function')
  })
  it('should not have bitcoinjs-lib.HDNode', function () {
    assert.equal(typeof crypto.bitcoin.HDNode, 'undefined')
  })
})
describe('bip-32', function () {
  it('should derive keys from seed', function () {
    const mnemonic = crypto.bip39.generateMnemonic()
    const seed = crypto.bip39.mnemonicToSeed(mnemonic, '')
    const root = crypto.bip32.fromSeed(seed, crypto.bitcoin.networks.testnet)
    const hdNode = root.derivePath(`m/44'/0'/0'`)
    assert.ok(hdNode)
  })
})

describe('tx-builder-equibit', function () {
  const tx = {
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
      address: 'mxk5zYRwVWDAwgKYaAadDeiCjY67ACAHLt'
      // equibit: {
      //   payment_currency: 0,
      //   payment_tx_id: '',
      //   issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
      //   issuance_json: ''
      // }
    }, {
      value: (25 - 1 - 0.0001) * 100000000,
      address: 'mm2zdwmiVBR7ipNiN3tr4CCu6sS5tFwKna'
      // equibit: {
      //   payment_currency: 0,
      //   payment_tx_id: '',
      //   issuance_tx_id: '0000000000000000000000000000000000000000000000000000000000000000',
      //   issuance_json: ''
      // }
    }]
  }
  const txid = 'a287b362e02471f7921df7e1e72dfb07bd5a102900d99b977112027746bdd94c'
  let buffer
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

describe('sha3', function () {
  it('should re-export sha3 from js-sha3', function () {
    assert.equal(typeof crypto.sha3.sha3_512, 'function')
    assert.equal(typeof crypto.sha3.sha3_256, 'function')
  })
  it('should create sha3_512 hash', function () {
    assert.equal(crypto.sha3.sha3_512('The quick brown fox jumps over the lazy dog'), '01dedd5de4ef14642445ba5f5b97c15e47b9ad931326e4b0727cd94cefc44fff23f07bf543139939b49128caf436dc1bdee54fcb24023a08d9403f9b4bf0d450')
  })
})

describe('htlc script', function () {
  it('should run the script playground', function () {
    const hashSecret = '88f1f9dcce43d0aea877b6be5d5ed4b90a470b151ccab39bc8d57584e6be03c7'
    const addr = 'mzWJ35ui9iizfTiypu8Aq7oWPb6gWbRvTe'
    const htlcScript = simpleHashlockSigContract(addr, hashSecret)
    console.log(`htlcScript = ${htlcScript.toString('hex')}`)
    assert.ok(htlcScript)
  })
})
