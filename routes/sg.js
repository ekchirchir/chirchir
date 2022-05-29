var express = require('express');
const { auth, basicAuth } = require('../middlewares');
const { generateAccessToken } = require("../utility")


var router = express.Router();
router.post("/api/getCustomer",basicAuth, function (req, res, next) {
    console.log(req.body)
    console.log(req.headers)
    return res.status(200).json({
      transactionID: new Date().getTime(),
      statusCode: 200,
      status:true,
      message: "Message queued successfully.",
    })
  })

  module.exports = router