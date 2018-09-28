'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setConfig = setConfig;
exports.getConfig = getConfig;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultSettings = {
    'facebook': {
        'client_id': process.env.FB_ID || null,
        'client_secret': process.env.FB_SECRET || null
    }
};
var settings = defaultSettings;

function setConfig(cnf) {
    settings = _lodash2.default.merge(defaultSettings, cnf);
}

function getConfig(key) {
    return _lodash2.default.get(settings, key);
}