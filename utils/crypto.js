var CryptoJS = require('crypto-js');

// AES加密
function aesEncrypt(content, key = 'test') {
  let encrypted = CryptoJS.AES.encrypt(content, key).toString();
  return encrypted;
}

// AES解密
function aesDecrypt(content, key = 'test') {
  let decrypt = CryptoJS.AES.decrypt(content, key);
  return decrypt.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  aesEncrypt,
  aesDecrypt
};