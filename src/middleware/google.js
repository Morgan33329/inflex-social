import _ from 'lodash';
import passport from 'passport';
import { Strategy as GoogleTokenStrategy } from 'passport-google-token';
import { createObject, successLoginInMiddleware, routeMiddleware } from 'inflex-authentication/helpers';

import { getConfig } from '../config';
import { repository, getId } from './../database';
import user from './../services/user';

const socialType = 2;

const defaultSettings = {
    'invalidToken' : function(res, message) {
        return res.status(422).json({ 
            'success' : false,
            'error' : {
                "code" : '4220402',
                "type" : '',
                "title" : 'Invalid access token',
                "detail" : message || 'Invalid access token'
            }
        });
    },

    'invalidRequest' : function(req, res) {
        return res.status(422).json({ 
            'success' : false,
            'error' : {
                "code" : '4220401',
                "type" : '',
                "title" : 'Missing access token',
                "detail" : 'Missing "access_token" parameter'
            }
        });
    }
};
var settings = defaultSettings;

var validateAccessToken = function (req, res, next) {
    if (req.body.access_token && typeof req.body.access_token == 'string')
        next();
    else
        settings.invalidRequest(req, res);
}

var getProfileFromFacebook = function (req, res, next) {
    passport.authenticate('google-token', function(err, user, info) {
        if (err) {
            return settings.invalidToken(res, err.message);
        } else if (!user) {
            return settings.invalidToken(res, 'Missing user from passport');
        }

        req.social = {
            'type' : 'google',
            'profile' : user.profile
        };
        
        if (user.new)
            req.newRegistration = true;

        successLoginInMiddleware(user.user, req, next, {
            'session' : false
        });
    })(req, res, next);
}

var ifNewUser = function (req, res, next) {
    if (req.newRegistration) {
        let middleware = routeMiddleware('registration', settings.version);

        if (middleware)
            return middleware(req, res, next);
    }

    next();
}

var strategyAdded = false;
function addStrategy () {
    if (strategyAdded)
        return;

    strategyAdded = true;

    let googleConfig = getConfig('google');

    passport.use(new GoogleTokenStrategy({
        clientID: googleConfig.clientId,
        clientSecret: googleConfig.clientSecret,
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        let googlePlusId = profile.id,
        
            userService = new user();

        repository('social')
            .findByIdAndType(googlePlusId, socialType)
            .then(social => {
                let hasSocial = function(identityId, socialId, newUser) {
                    createObject({
                        'identity' : identityId,
                        'social' : socialId
                    })
                    .then(user => {
                        done(null, {
                            'profile' : profile,
                            'refresh' : refreshToken,

                            'new' : newUser,

                            'user' : user
                        });
                    })
                    .catch((err) => {
                        throw err;
                    });
                }

                if (!social) {
                    console.log("New social user");

                    userService
                        .createWithSocial(googlePlusId, socialType)
                        .then(data => {
                            hasSocial(getId(data.identity), getId(data.social), true);
                        });
                } else {
                    hasSocial(social.identity_id, getId(social), false);
                }
            });
    }));
}

export default function (options, middleware) {
    settings = _.merge(defaultSettings, options || {});

    addStrategy();

    var ret = middleware || [];

    ret.push(
        validateAccessToken,

        getProfileFromFacebook,

        ifNewUser
    );

    return ret;
}