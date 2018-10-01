import passport from 'passport';

import { getConfig } from './config';
import { middleware } from './social';

var successLogin = function(req, res) {
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

    let facebookConfig = getConfig('facebook');

    if (facebookConfig.clientId) {
        app.post(
            '/api/login/facebook', 
            middleware('facebook'), 
            options.action || successLogin
        );
    }
}

export function googlePlusLogin (app, options) {
    options = options || {};

    let googlePlusConfig = getConfig('google-plus');

    if (googlePlusConfig.clientId) {
        app.post(
            '/api/login/google-plus', 
            middleware('google-plus'), 
            options.action || successLogin
        );
    }
}