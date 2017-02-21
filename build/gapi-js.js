(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("superagent"));
	else if(typeof define === 'function' && define.amd)
		define(["superagent"], factory);
	else if(typeof exports === 'object')
		exports["gapi-js"] = factory(require("superagent"));
	else
		root["gapi-js"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GapiResources {

  constructor() {
    this.resource = null;
  }

  get countries() { this.resource = 'countries'; return this; }
  set countries(value) { return this; }

  get places() { this.resource = 'places'; return this;}
  set places(value) { return this; }

  get dossiers() { this.resource = 'dossiers'; return this; }
  set dossiers(value) { return this; }

  get country_dossiers() { this.resource = 'country_dossiers'; return this; }
  set country_dossiers(value) { return this; }

  get place_dossiers() { this.resource = 'place_dossiers'; return this;}
  set place_dossiers(value) { return this; }

  get transport_dossiers() { this.resource = 'transport_dossiers'; return this; }
  set transport_dossiers(value) { return this; }

  get activity_dossiers() { this.resource = 'activity_dossiers'; return this; }
  set activity_dossiers(value) { return this; }

  get accommodation_dossiers() { this.resource = 'accommodation_dossiers'; return this; }
  set accommodation_dossiers(value) { return this; }

  get features() { this.resource = 'features'; return this; }
  set features(value) { return this; }

  get dossier_features() { this.resource = 'dossier_features'; return this; }
  set dossier_features(value) { return this; }

  get dossier_segments() { this.resource = 'dossier_segments'; return this; }
  set dossier_segments(value) { return this; }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GapiResources;



/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_superagent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gapi_resources__ = __webpack_require__(0);



// TODO: Accept integer resourcesIds for `get`, `patch`, and `del`; right now only string are allowed
// TODO: Errors
//       2. Every request will at least need one resource call
//          and one call to either `get`, `list`, `all`, `post`, `patch`, `del`
//          before `end()` could be called
// TODO: Authentication

class Gapi extends __WEBPACK_IMPORTED_MODULE_1__gapi_resources__["a" /* default */] {

  constructor ({url='https://rest.gadventures.com', key, proxy}){
    super();

    if( !key ) {
      throw 'A gapi key is required when instantiating Gapi'
    }

    this.baseUrl = url;
    this.key = key;
    this.proxy = proxy;
    this.queryString = {};
  }

  _setHeaders() {
    this.request.accept('application/json;version=alldossiers');
    this.request.type('application/json');
    this.request.set('X-Application-Key', this.key);
    // this.request.set('X-Fastly-Bypass', 'pass');  // Temporary
  }

  _getUrl(id='') {
    /**
     *  Builds the full gapi request URL based on the resource provided
     *  `this.resource` is set by `GapiResource` getter methods.
    **/
    if( ! this.resource ) {
      throw 'No resource has been provided.';  // TODO: Something more declarative.
    }
    return `${this.baseUrl}/${this.resource}/${id.toString()}`;
  }

  get( id ) {
    /**
     * Support for multiple resource Ids
     * For resources that accept more than one id. e.g. `itineraries/123/456/`
    **/
    const url = this._getUrl(id);
    this.request = __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.get(url);
    this._setHeaders();
    return this;
  }

  list(number=1, size=20) {
    /**
     *  By default will look for the first 20 items
    **/
    const url = this._getUrl();
    this.request = __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.get(url);
    this.page(number, size);
    this._setHeaders();
    return this;
  }

  query(queryString) {
    this.queryString = Object.assign({}, this.queryString, queryString);
    return this;
  }

  page(number=1, size=20) {
    this.queryString = Object.assign({}, this.queryString, {page: number, max_per_page: size});
    return this;
  }

  order(...args) {
    // TODO: Not implemented
    return this;
  }

  post () {
    const url = this._getUrl();
    this.request = __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post(url);
    this._setHeaders();
    return this;
  }

  patch (id) {
    const url = this._getUrl(id);
    this.request = __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.patch(url);
    this._setHeaders();
    return this;
  }

  del (id) {
    const url = this._getUrl(id);
    this.request = __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.del(url);
    this._setHeaders();
    return this;
  }

  send ( args ) {
    this.request.send( args );
    return this;
  }

  end (callback) {
    this.request.query(this.queryString);
    this.request.end(callback);
    return this;
  }

  then (resolve, reject) {
    return this.request.then(resolve, reject);
  }

}
/* harmony export (immutable) */ __webpack_exports__["default"] = Gapi;



/***/ })
/******/ ]);
});
//# sourceMappingURL=gapi-js.js.map