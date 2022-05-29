var express = require("express")
var router = express.Router()
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const { verifySignature, signSignature } = require("../utility")

router.get("/", function (req, res, next) {
  res.json({ hello: "hello world" })
})

router.post("/validate", async (req, res, next) => {
  // console.log(req.headers)
  // res.json(req.body)
  let { Envelope } = req.body
  try {
    const message = await verifySignature(Envelope)
    console.log(message)
    if(message){
      // plan to sign it
      message.success=true
      const payload = await signSignature(JSON.stringify(message))
      payload.message = message
      res.json(payload)
    }
  } catch (error) {
    console.log(error)
    res.json({error:'Invalid Signature'})
  }

})

router.post("/activate", (req, res, next) => {
  console.log(req)

  let { digital_signature, message, encoded_message } = req.body.Envelope

  let publicKey = fs.readFileSync(
    path.join(__dirname, "../", "keys", "key.pem")
  )
  publicKey = crypto.createPublicKey({
    key: publicKey,
    type: "pkcs8", //TODO: get support for PKCS12
    format: "pem",
  })
  console.log(publicKey)

  // if(!message){
  //   return res.json({error:'No message was received'}).status(401)
  // }
  //console.log(req.body)
  const verifier = crypto.createVerify("RSA-SHA256")
  verifier.update(encoded_message)
  verifier.end()
  let result = verifier.verify(
    publicKey,
    Buffer.from(digital_signature, "base64")
  )
  //console.log(result)
  if (!result) {
    // give out response
    throw new Error("invalid token")
  }
  return res.json({ error: 0, message })
})

const sortObject = function orderObj(unordered) {
  const ordered = Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key]
      return obj
    }, {})
  return unordered
}

module.exports = router
