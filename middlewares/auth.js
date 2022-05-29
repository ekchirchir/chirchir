const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next){
    const authheader = req.headers['authorization']
    const token = authheader && authheader.split(' ')[1]

    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user)=> {
        // console.log(error, user)
        if(error){
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}