import request from 'superagent';
import GapiResources from './gapi-resources';

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

  _getUrl(...ids) {
    /**
     *  Builds the full gapi request URL based on the resource provided
     *  `this.resource` is set by `GapiResource` getter methods.
    **/
    if( ! this.resource ) {
      throw 'No resource has been provided.';  // TODO: Something more declarative.
    }
    const args = [this.baseUrl, this.resource, ...ids];
    return args.join('/')
  }

  get( ids ) {
    /**
     * Support for multiple resource Ids
     * For resources that accept more than one id. e.g. `itineraries/123/456/`
    **/
    const url = this._getUrl(ids);
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
    this.query({page: number, max_per_page: size});
    return this;
  }

  order(...rest) {
    this.orderItems = rest;
    return this;
  }

  setQueryString() {
    this.request.query(this.queryString);
    this.orderItems.forEach((orderProp) => {
      let thisOrderProp = orderProp;
      const isDesc = orderProp.indexOf('-') === 0;
      if (isDesc){ thisOrderProp = orderProp.slice(1); }
      const queryParam = `order_by__${isDesc ? 'desc' : 'asc'}`;
      this.request.query(`${queryParam}=${thisOrderProp}`); 
    });
    return this;
  }

  post () {
    const url = this._getUrl();
    this.request = request.post(url);
    this._setHeaders();
    return this;
  }

  patch (ids) {
    const url = this._getUrl(ids);
    this.request = request.patch(url);
    this._setHeaders();
    return this;
  }

  del (ids) {
    const url = this._getUrl(ids);
    this.request = request.del(url);
    this._setHeaders();
    return this;
  }

  send ( args ) {
    this.request.send( args );
    return this;
  }

  end (callback) {
    this.setQueryString();
    this.request.end(callback);
    return this;
  }

  then (resolve, reject) {
    this.setQueryString();
    return this.request.then(resolve, reject);
  }

}


