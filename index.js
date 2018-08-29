var bip32 = require('bip32')
var bip39 = require('bip39')
var bitcoin = require('bitcoinjs-lib')
var scriptNumber = require('bitcoinjs-lib/src/script_number')
var pbkdf2 = require('pbkdf2')
var createHmac = require('create-hmac')
var createHash = require('create-hash')
var crypto = require('crypto-browserify')
var txBuilder = require('tx-builder')
var eqbTxBuilder = require('tx-builder-equibit')
var walletMessage = require('@equibit/wallet-message')
var randomBytes = require('randombytes')
var types = require('tx-builder/src/types')
var Buffer = require('safe-buffer').Buffer
var sha3 = require('js-sha3')

module.exports = {
  bip32: bip32,
  bip39: bip39,
  bitcoin: bitcoin,
  pbkdf2: pbkdf2.pbkdf2,
  pbkdf2Sync: pbkdf2.pbkdf2Sync,
  createHmac: createHmac,
  createHash: createHash,
  createCipher: crypto.createCipher,
  createDecipher: crypto.createDecipher,
  txBuilder: txBuilder,
  eqbTxBuilder: eqbTxBuilder,
  walletMessage,
  randomBytes,
  types,
  Buffer,
  scriptNumber,
  sha3
}
