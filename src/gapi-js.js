import request from 'superagent';
import GapiResources from './gapi-resources';


const GapiGenerator = (ResourceClass) => {

  class Gapi extends ResourceClass {

    constructor ({url = 'https://rest.gadventures.com', key, proxy}) {
      super();

      if (!key) {
        throw 'A gapi key is required when instantiating Gapi'
      }

      this.baseUrl = url;
      this.key = key;
      this.proxy = proxy;
      this.queryParams = {};
      this.dupableParams = [];
    }

    _setHeadersParams () {
      this.request.accept(this.proxy ? `application/json;${this.proxy}` : `application/json`);
      this.request.type('application/json');
      this.request.set('X-Application-Key', this.key);

      this.request.query(this.queryParams);
      this.dupableParams.forEach((paramPair) => {
        this.request.query(`${paramPair[0]}=${paramPair[1]}`);
      });
      return this;
      // this.request.set('X-Fastly-Bypass', 'pass');  // Temporary
    }

    _getUrl (...ids) {
      /**
       *  Builds the full gapi request URL based on the resource provided
       *  `this.resource` is set by `GapiResource` getter methods.
       **/
      if (!this.resource) {
        throw 'No resource has been provided.';  // TODO: Something more declarative.
      }
      const args = [this.baseUrl, this.resource, ...ids];
      return args.join('/') + '/';
    }

    get (...ids) {
      /**
       * Support for multiple resource Ids
       * For resources that accept more than one id. e.g. `itineraries/123/456/`
       **/
      const url = this._getUrl(...ids);
      this.request = request.get(url);
      return this;
    }

    list (number = 1, size = 20) {
      /**
       *  By default will look for the first 20 items
       **/
      const url = this._getUrl();
      this.request = request.get(url);
      this.page(number, size);
      return this;
    }

    query (queryObj) {
      this.queryParams = Object.assign({}, this.queryParams, queryObj);
      return this;
    }

    page (number = 1, size = 20) {
      this.query({page: number, max_per_page: size});
      return this;
    }

    order (...fields) {
      fields.forEach((orderProp) => {
        let thisOrderProp = orderProp;
        const isDesc = orderProp.indexOf('-') === 0;
        if (isDesc) {
          thisOrderProp = orderProp.slice(1);
        }
        if (thisOrderProp.length === 0) {
          throw new Error('Order parameter property is an empty string');
        }
        const queryParam = `order_by__${isDesc ? 'desc' : 'asc'}`;
        this.dupableParams.push([queryParam, thisOrderProp]);

      });
      return this;
    }

    post () {
      const url = this._getUrl();
      this.request = request.post(url);
      return this;
    }

    patch (ids) {
      const url = this._getUrl(ids);
      this.request = request.patch(url);
      return this;
    }

    del (ids) {
      const url = this._getUrl(ids);
      this.request = request.del(url);
      return this;
    }

    graphQL (query, variables) {
      const url = [this.baseUrl, 'graphql'].join('/') + '/';
      this.request = request.post(url).send({query, variables});
      return this;
    }

    send (args) {
      this.request.send(args);
      return this;
    }

    end (callback) {
      this.request.query({'cache_bust': Date.now()});
      this._setHeadersParams().request.end(callback);
      return this;
    }

    then (resolve, reject) {
      this.request.query({'cache_bust': Date.now()});
      return this._setHeadersParams().request.then(resolve, reject);
    }
  }

  return Gapi;
};

export default GapiGenerator(GapiResources);

export {
  GapiGenerator,
  GapiResources,
}
