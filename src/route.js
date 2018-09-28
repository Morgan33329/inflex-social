import passport from 'passport';

import { facebookMiddleware } from './social';

var successFacebook = function(req, res) {
    req
        .token()
        .generate(req.body.device)
        .then((ret) => {
            ret.disable.exceptMe();

            res.json({
                "error" : false,
                "response" : {
                    "token" : ret.token
                }
            });
        })
        .catch(err => { 
            console.log(err);

            res.send("fail doJWTLogin");
        });
}

export function facebookLogin (app, options) {
    options = options || {};

    app.post(
        '/api/login/facebook', 
        facebookMiddleware(), 
        options.action || successFacebook
    );
}
