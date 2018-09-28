'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (type) {
    switch (type) {
        case 'identity':
            return (0, _identity2.default)();
        case 'social':
            return (0, _social2.default)();
        default:
            console.log('Invalid repository type: ' + type);
    }
};

var _identity = require('./mongo/identity');

var _identity2 = _interopRequireDefault(_identity);

var _social = require('./mongo/social');

var _social2 = _interopRequireDefault(_social);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }