"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.socialRoutes = socialRoutes;
exports.facebookMiddleware = facebookMiddleware;

var _facebook = require("./middleware/facebook");

var _facebook2 = _interopRequireDefault(_facebook);

var _route = require("./route");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function socialRoutes(app, options) {
    options = options || {};

    (0, _route.facebookLogin)(app, options.facebook || {});
}

function facebookMiddleware(options, middlewares) {
    return (0, _facebook2.default)(options, middlewares);
}