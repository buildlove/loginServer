var { aesEncrypt, aesDecrypt } = require('../utils/crypto');

function uuid() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return aesEncrypt(uuid).slice(0, 40)
}

module.exports = {
  uuid
};