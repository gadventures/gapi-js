'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _gapiResources = require('./gapi-resources');

var _gapiResources2 = _interopRequireDefault(_gapiResources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Accept integer resourcesIds for `get`, `patch`, and `del`; right now only string are allowed
// TODO: Errors
//       2. Every request will at least need one resource call
//          and one call to either `get`, `list`, `all`, `post`, `patch`, `del`
//          before `end()` could be called
// TODO: Authentication

var Gapi = function (_GapiResources) {
  _inherits(Gapi, _GapiResources);

  function Gapi(_ref) {
    var _ref$url = _ref.url,
        url = _ref$url === undefined ? 'https://rest.gadventures.com' : _ref$url,
        key = _ref.key,
        proxy = _ref.proxy;

    _classCallCheck(this, Gapi);

    var _this = _possibleConstructorReturn(this, (Gapi.__proto__ || Object.getPrototypeOf(Gapi)).call(this));

    if (!key) {
      throw 'A gapi key is required when instantiating Gapi';
    }

    _this.baseUrl = url;
    _this.key = key;
    _this.proxy = proxy;
    _this.queryString = {};
    return _this;
  }

  _createClass(Gapi, [{
    key: '_setHeaders',
    value: function _setHeaders() {
      this.request.accept('application/json;version=alldossiers');
      this.request.type('application/json');
      this.request.set('X-Application-Key', this.key);
      // this.request.set('X-Fastly-Bypass', 'pass');  // Temporary
    }
  }, {
    key: '_getUrl',
    value: function _getUrl() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      /**
       *  Builds the full gapi request URL based on the resource provided
       *  `this.resource` is set by `GapiResource` getter methods.
      **/
      if (!this.resource) {
        throw 'No resource has been provided.'; // TODO: Something more declarative.
      }
      return this.baseUrl + '/' + this.resource + '/' + id.toString();
    }
  }, {
    key: 'get',
    value: function get(id) {
      /**
       * Support for multiple resource Ids
       * For resources that accept more than one id. e.g. `itineraries/123/456/`
      **/
      var url = this._getUrl(id);
      this.request = _superagent2.default.get(url);
      this._setHeaders();
      return this;
    }
  }, {
    key: 'list',
    value: function list() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;

      /**
       *  By default will look for the first 20 items
      **/
      var url = this._getUrl();
      this.request = _superagent2.default.get(url);
      this.page(number, size);
      this._setHeaders();
      return this;
    }
  }, {
    key: 'query',
    value: function query(queryString) {
      this.queryString = Object.assign({}, this.queryString, queryString);
      return this;
    }
  }, {
    key: 'page',
    value: function page() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;

      this.queryString = Object.assign({}, this.queryString, { page: number, max_per_page: size });
      return this;
    }
  }, {
    key: 'order',
    value: function order() {
      // TODO: Not implemented
      return this;
    }
  }, {
    key: 'post',
    value: function post() {
      var url = this._getUrl();
      this.request = _superagent2.default.post(url);
      this._setHeaders();
      return this;
    }
  }, {
    key: 'patch',
    value: function patch(id) {
      var url = this._getUrl(id);
      this.request = _superagent2.default.patch(url);
      this._setHeaders();
      return this;
    }
  }, {
    key: 'del',
    value: function del(id) {
      var url = this._getUrl(id);
      this.request = _superagent2.default.del(url);
      this._setHeaders();
      return this;
    }
  }, {
    key: 'send',
    value: function send(args) {
      this.request.send(args);
      return this;
    }
  }, {
    key: 'end',
    value: function end(callback) {
      this.request.query(this.queryString);
      this.request.end(callback);
      return this;
    }
  }, {
    key: 'then',
    value: function then(resolve, reject) {
      return this.request.then(resolve, reject);
    }
  }]);

  return Gapi;
}(_gapiResources2.default);

exports.default = Gapi;