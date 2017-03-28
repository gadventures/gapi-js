import request from 'superagent';
import GapiResources from './gapi-resources';

// TODO: Accept integer resourcesIds for `get`, `patch`, and `del`; right now only string are allowed
// TODO: Errors
//       2. Every request will at least need one resource call
//          and one call to either `get`, `list`, `all`, `post`, `patch`, `del`
//          before `end()` could be called
// TODO: Authentication

export default class Gapi extends GapiResources {

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
    this.request.accept(this.proxy ? `application/json;${this.proxy}` : `application/json`);
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
    this.request = request.get(url);
    this._setHeaders();
    return this;
  }

  list(number=1, size=20) {
    /**
     *  By default will look for the first 20 items
    **/
    const url = this._getUrl();
    this.request = request.get(url);
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

  order(...rest) {
    if (rest == null) { return this; }
    if (rest.length === 0) { return this; }
    rest.forEach((orderProp) => {
      let thisOrderProp = orderProp;
      const isDesc = orderProp.indexOf('-') === 0;
      console.log("ORDERPROP:", orderProp);
      if (isDesc){ thisOrderProp = orderProp.slice(1); }
      const updateObj = {};
      updateObj[`order_by__${isDesc ? 'desc' : 'asc'}`] = thisOrderProp;
      this.queryString = Object.assign({}, this.queryString, updateObj);
    });
    return this;
  }

  post () {
    const url = this._getUrl();
    this.request = request.post(url);
    this._setHeaders();
    return this;
  }

  patch (id) {
    const url = this._getUrl(id);
    this.request = request.patch(url);
    this._setHeaders();
    return this;
  }

  del (id) {
    const url = this._getUrl(id);
    this.request = request.del(url);
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
