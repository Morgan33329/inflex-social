'use strict';

var path = require("path");

process.env.DEVELOPER = true;

process.env.FB_ID = 'xxx';
process.env.FB_SECRET = 'xxx';
var port = 3000;

var { 
    authExpress,
    authRoutes,
    authConfig
} = require("inflex-authentication");

var {
    socialRoutes
} = require("./../social");

authConfig({
    host : 'http://192.168.0.122:' + port,

    database : {
        type : "mongo",

        host : 'mongodb://auth_1:auth_1@localhost:27017/auth_1'
    },

    mailTransport : {
        'service' : 'gmail',
        'auth' : {
            'user' : 'xxx',
            'pass' : 'xxx'
        }
    }
});


const bodyParser = require("body-parser");
const express = require('express')
const app = express();
   
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

authExpress(app);

authRoutes(app);
socialRoutes(app);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log('Example app listening on port 3000!'))