'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _database = require('./../database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createIdentity() {
    return (0, _database.repository)('identity').insert({
        'activated': true,
        'enabled': true,
        'blocked': false
    }).then(function (identity) {
        console.log('Identity uploaded');

        return identity;
    });
}

function createSocial(identityId, id, type) {
    return (0, _database.repository)('social').insert({
        'identity_id': identityId,

        'social_type': type,
        'social_id': id
    }).then(function (social) {
        console.log('Social uploaded');

        return social;
    });
}

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'createWithSocial',
        value: function createWithSocial(id, type) {
            return createIdentity().then(function (identity) {
                return createSocial((0, _database.getId)(identity), id, type).then(function (social) {
                    return {
                        'identity': identity,
                        'social': social
                    };
                });
            }).catch(function (err) {
                console.log(err);
            });
        }
    }]);

    return _class;
}();

exports.default = _class;