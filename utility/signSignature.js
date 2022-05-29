
const fs= require('fs')
const crypto = require('crypto')
module.exports = function signSignature(payload) {
    return new Promise((resolve, reject) => {
      if (!payload) {
        reject("payload is required")
      }
  
      fs.readFile("./keys/private.pem", (error, buffKey) => {
        if (error) {
          return reject(error)
        }
  
        const privateKey = createprivateKey(buffKey)
        const encoded_message = strToBase64(payload)
        const sign = crypto.createSign("RSA-SHA256")
        sign.update(encoded_message)
        sign.end()
        const digital_signature = sign.sign(privateKey).toString("base64")
        resolve({
          encoded_message,
          digital_signature,
        })
      })
    })
  
    function createprivateKey(buffKey) {
      return crypto.createPrivateKey({
        key: buffKey,
        type: "pkcs8", //TODO: get support for PKCS12
        format: "pem",
        passphrase: "UBX@2021",
      })
    }
  
    function strToBase64(payload) {
      return Buffer.from(payload).toString("base64")
    }
  }