const https = require('https');
const http = require('http')
const fs = require('fs')
const path = require('path')
const app = require('./app')
const dotenv = require('dotenv')
const {isReadable} = require('./utility')

// get the configs into process.env

dotenv.config();

// ssl server
const serverSSL = https.createServer({
    key:fs.readFileSync(path.join(__dirname, 'keys', 'private.pem')),
    cert:fs.readFileSync(path.join(__dirname, 'keys', 'public.pem')),
}, app)


// http server
const server = http.createServer(app)


if(process.argv[2] === 'ssl'){
    serverSSL.listen(3000, ()=> {
        console.log('running on localhost:3000')
    })
}else{
    server.listen(3000, ()=>{
        console.log('listening on port 3000')
    })

}

// decide which app to fire
