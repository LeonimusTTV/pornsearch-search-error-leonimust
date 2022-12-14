'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _Modules = require('./core/Modules');

var _Modules2 = _interopRequireDefault(_Modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GIF = 'gif';
var PARSER = 'Parser';
var VIDEO = 'video';

var Pornsearch = function () {
  function Pornsearch(query, driver) {
    (0, _classCallCheck3.default)(this, Pornsearch);

    this.module = {};
    this.modules = _Modules2.default;

    this.driver(driver, query);
  }

  (0, _createClass3.default)(Pornsearch, [{
    key: 'support',
    value: function support() {
      return this.modules.map(function (module) {
        return module.name;
      });
    }
  }, {
    key: 'current',
    value: function current() {
      return this.module.name;
    }
  }, {
    key: 'gifs',
    value: function gifs(page) {
      return this._get(this.module.gifUrl(page), GIF, page || this.module.firstpage);
    }
  }, {
    key: 'videos',
    value: function videos(page) {
      return this._get(this.module.videoUrl(page), VIDEO, page || this.module.firstpage);
    }
  }, {
    key: '_get',
    value: function _get(url, type, page) {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        _axios2.default.get(url).then(function (_ref) {
          var body = _ref.data;

          var data = _this.module[type + PARSER](_cheerio2.default.load(body), body);

          if (!data.length) {
            new Error('No results');
          }

          resolve(data);
        }).catch(function (error) {
          console.warn(error);

          new Error('No results for search related to ' + _this.module.query + ' in page ' + page);
        });
      });
    }
  }, {
    key: 'driver',
    value: function driver() {
      var _driver = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pornhub';

      var query = arguments[1];

      var PornModule = this.modules[_driver.toLowerCase()];

      if (!PornModule) {
        throw new Error('We don\'t support ' + _driver + ' by now =/');
      }

      this.module = new PornModule(query || this.query);

      return this;
    }
  }, {
    key: 'query',
    get: function get() {
      return this.module.query || '';
    }
  }], [{
    key: 'search',
    value: function search(query) {
      return new Pornsearch(query);
    }
  }]);
  return Pornsearch;
}();

exports.default = Pornsearch;
module.exports = exports['default'];