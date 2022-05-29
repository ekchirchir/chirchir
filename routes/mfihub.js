var express = require('express');
const { auth } = require('../middlewares');
const { generateAccessToken } = require("../utility")


var router = express.Router();

/* GET users listing. */
router.get('/ProcessWalletTransaction', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/api/AcquirePass", function (req, res, next) {
  const usernameStored = "user1"
  const passwordStored = "mypassword"
  const { username, password } = req.body
  console.log(req.body)
  if (username === usernameStored && password === passwordStored) {
    return res
      .json({
        expires_in: 60,
        token: generateAccessToken(username),
      })
  } else {
    return res.status(401).json({
      error: "invalid_grant",
      error_description: "User VISION_FUN does not exist."
  });
  }
})

router.post('/ProcessWalletTransaction', auth, function(req, res, next) {
    console.log(req.body)
    console.log(req.headers)
   res.json({
    status: true,
    description: 'Success',
    transactionid: 'RQ546464641' + new Date().getTime()
   })
  });
  

module.exports = router;
