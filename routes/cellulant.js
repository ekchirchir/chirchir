var express = require("express")
const { auth } = require("../middlewares")
const { generateAccessToken } = require("../utility")
var router = express.Router()

/* GET users listing. */
router.get("/api/engagement", function (req, res, next) {
  res.send("respond with a resource")
})

router.post("/api/login", function (req, res, next) {
  const usernameStored = "VISION_FUND"
  const passwordStored = "VISION_FUND"
  const { username, password } = req.body
  console.log(req.body)
  if (username === usernameStored && password === passwordStored) {
    return res
      .json({
        token_type: "bearer",
        expires_in: 3600,
        access_token: generateAccessToken(username),
      })
  } else {
    return res.status(401).json({
      error: "invalid_grant",
      error_description: "User VISION_FUN does not exist."
  });
  }
})

router.post("/api/engagement",auth, function (req, res, next) {
  console.log(req.body)
  console.log(req.headers)
  return res.json({
    transactionID: new Date().getTime(),
    statusCode: 200,
    message: "Message queued successfully.",
  })
})

module.exports = router
