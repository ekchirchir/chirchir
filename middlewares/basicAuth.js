module.exports = function basicAuth(req, res, next){
    storedPassCredentials = {
        username:'user1',
        password:'mypassword'
    }
    const authheader = req.headers['authorization']

    if (!authheader) return res.sendStatus(401);

    const credentialsBase64 = authheader && authheader.split(' ')[1]

    if (credentialsBase64 === null) return res.sendStatus(401);

    let credentials = Buffer.from(credentialsBase64, 'base64').toString('ascii').split(':')
    if(credentials[0]===storedPassCredentials.username && credentials[1]=== storedPassCredentials.password){
        req.user = storedPassCredentials
        next()
        return;
    }
    
     return res.sendStatus(403);

}