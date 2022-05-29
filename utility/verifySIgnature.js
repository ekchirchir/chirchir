
const fs= require('fs')
const crypto = require('crypto')
module.exports = function verifySignature(payload) {
    return new Promise((resolve, reject) => {
      fs.readFile("./keys/public.pem", (error, buffKey) => {
        if (error) {
          return reject(error)
        }
  
        const publicKey = createPublicKey(buffKey)
        const verifier = crypto.createVerify("RSA-SHA256")
        verifier.update(payload.encoded_message)
        verifier.end()
        let result = verifier.verify(
          publicKey,
          Buffer.from(payload.digital_signature, "base64")
        )
        if (result) {
          const decoded_message = JSON.parse(base64ToStr(payload.encoded_message))
          resolve(decoded_message)
        } else {
          reject("Invalid Signature")
        }
      })
    })
    function base64ToStr(data) {
      return Buffer.from(data, "base64").toString("ascii")
    }
    function createPublicKey(buffKey) {
      return crypto.createPublicKey({
        key: buffKey,
        type: "pkcs8", //TODO: get support for PKCS12
        format: "pem"
      })
    }
  }