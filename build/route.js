'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.facebookLogin = facebookLogin;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _social = require('./social');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var successFacebook = function successFacebook(req, res) {
    req.token().generate(req.body.device).then(function (ret) {
        ret.disable.exceptMe();

        res.json({
            "error": false,
            "response": {
                "token": ret.token
            }
        });
    }).catch(function (err) {
        console.log(err);

        res.send("fail doJWTLogin");
    });
};

function facebookLogin(app, options) {
    options = options || {};

    app.post('/api/login/facebook', (0, _social.facebookMiddleware)(), options.action || successFacebook);
}