module.exports = {
  isReadable: require("./checkPermission"),
  signSignature:require('./signSignature'),
  verifySignature:require('./verifySIgnature'),
  generateAccessToken:require('./generateAccessToken'),
  strToBase64(data) {
    let buff = Buffer.from(data)
    let base64data = buff.toString("base64")
    return base64data
  },
  base64ToStr(data) {
    let buff = Buffer.from(data, "base64")
    let base64data = buff.toString("ascii")
    return base64data
  },

}
