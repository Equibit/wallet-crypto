var bip39 = require('bip39');
var pbkdf2 = require('pbkdf2');
var createHmac = require('create-hmac');

module.exports = {
  bip39: bip39,
  pbkdf2: pbkdf2,
  createHmac: createHmac
};
