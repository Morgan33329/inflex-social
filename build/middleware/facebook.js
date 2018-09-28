'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (options, middleware) {
    settings = _lodash2.default.merge(defaultSettings, options || {});

    var facebookConfig = (0, _config.getConfig)('facebook');

    _passport2.default.use(new _passportFacebookToken2.default({
        clientID: facebookConfig.client_id,
        clientSecret: facebookConfig.client_secret
    }, function (accessToken, refreshToken, profile, done) {
        var facebookId = profile.id,
            userService = new _user2.default();

        (0, _database.repository)('social').findByIdAndType(facebookId, socialType).then(function (social) {
            var hasSocial = function hasSocial(identityId, socialId) {
                (0, _helpers.createObject)({
                    'identity': identityId,
                    'social': socialId
                }).then(function (user) {
                    done(null, {
                        'profile': profile,
                        'refresh': refreshToken,

                        'user': user
                    });
                }).catch(function (err) {
                    throw err;
                });
            };

            if (!social) {
                console.log("New social user");

                userService.createWithSocial(facebookId, socialType).then(function (data) {
                    hasSocial((0, _database.getId)(data.identity), (0, _database.getId)(data.social));
                });
            } else {
                hasSocial(social.identity_id, (0, _database.getId)(social));
            }
        });
    }));

    var ret = middleware || [];

    ret.push(validateEmail, getProfileFromFacebook);

    return ret;
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebookToken = require('passport-facebook-token');

var _passportFacebookToken2 = _interopRequireDefault(_passportFacebookToken);

var _helpers = require('inflex-authentication/helpers');

var _config = require('../config');

var _database = require('./../database');

var _user = require('./../services/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socialType = 1;

var defaultSettings = {
    'invalidToken': function invalidToken(res, message) {
        return res.status(422).json({
            'error': true,
            "code": '4220402',
            "type": '',
            "title": 'Invalid access token',
            "detail": message || 'Invalid access token'
        });
    },

    'invalidRequest': function invalidRequest(req, res) {
        return res.status(422).json({
            'error': true,
            "code": '4220401',
            "type": '',
            "title": 'Missing access token',
            "detail": 'Missing "access_token" parameter'
        });
    }
};
var settings = defaultSettings;

var validateEmail = function validateEmail(req, res, next) {
    if (req.body.access_token && typeof req.body.access_token == 'string') next();else settings.invalidRequest(req, res);
};

var getProfileFromFacebook = function getProfileFromFacebook(req, res, next) {
    _passport2.default.authenticate('facebook-token', function (err, user, info) {
        if (err) {
            return settings.invalidToken(res, err.message);
        } else if (!user) {
            return settings.invalidToken(res, 'Missing user from passport');
        }

        req.social = {
            'type': 'facebook',
            'profile': user.profile
        };

        (0, _helpers.successLoginInMiddleware)(user.user, req, next, {
            'session': false
        });
    })(req, res, next);
};