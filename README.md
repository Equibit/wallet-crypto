[![Build Status](https://travis-ci.org/Equibit/wallet-crypto.png?branch=master)](https://travis-ci.org/Equibit/wallet-crypto)

# Equibit Wallet Crypto Utils

This is a collection of crypto libraries for Equibit Wallet app.

Release branch contains `dist` folders with two bundles built with `browserify`:
- `dist/wallet-crypto.js`
- `dist/wallet-crypto.min.js`

Install:
```
npm install @equibit/wallet-crypto
```

## API

Main export contains the following properties:

- `bip39` - `bip39` library,
- `bitcoin` - `bitcoin-js` library,
- `pbkdf2` - `pbkdf2.pbkdf2` method,
- `pbkdf2Sync` - `pbkdf2.pbkdf2Sync` method,
- `createHmac` - `create-hmac` library,
- `createHash` - `create-hash` library,
- `createCipher` - `createCipher` method of `crypto-browserify`,
- `createDecipher` - `createDecipher` method of `crypto-browserify`,
- `eqbTxBuilder` - `tx-builder-equibit` Equibit library,
- `walletMessage` - `wallet-message` Equibit library

Test:
```
npm test
```

Build:
```
npm run build
```
