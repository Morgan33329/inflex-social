'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function () {
    if (!socialRepository) socialRepository = new SocialRepository();

    return socialRepository;
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _database = require('./../../database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var socialRepository;

var SocialRepository = function () {
    function SocialRepository() {
        _classCallCheck(this, SocialRepository);
    }

    _createClass(SocialRepository, [{
        key: 'insert',
        value: function insert(data) {
            return new _bluebird2.default(function (resolve) {
                (0, _database.model)('social').create(data, function (err, result) {
                    resolve(result);
                });
            });
        }
    }, {
        key: 'findByIdAndType',
        value: function findByIdAndType(socialId, type) {
            return new _bluebird2.default(function (resolve) {
                (0, _database.model)('social').findOne({
                    social_type: type,
                    social_id: socialId
                }).exec(function (err, result) {
                    resolve(result);
                });
            });
        }
    }]);

    return SocialRepository;
}();