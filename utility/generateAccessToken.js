const jwt = require('jsonwebtoken')

module.exports = function(username){
    console.log(process.env.TOKEN_SECRET, username)
    return jwt.sign({username}, process.env.TOKEN_SECRET, {expiresIn: 3600})
}