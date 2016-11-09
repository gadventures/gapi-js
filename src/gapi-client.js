import request from 'superagent';
import {path} from 'path';

// TODO: Errors
// TODO: Authentication

export class Gapi{

  constructor (key){
    this.request = null;
    this.gapiKey = key;
  }

  _setHeaders() {
    this.request.accept('application/json');
    this.request.type('application/json');
    this.request.set('X-Application-Key', this.gapiKey);
    this.request.set('X-Fastly-Bypass', 'pass');  // Temporary
  }

  get(url) {
    this.request = request.get(url);
    this._setHeaders();
    return this;
  }

  post (url) {
    this.request = request.post(url);
    this._setHeaders();
    return this;
  }

  patch (url) {
    this.request = request.patch(url);
    this._setHeaders();
    return this;
  }

  del (url) {
    this.request = request.del(url);
    this._setHeaders();
    return this;
  }

  end (callback) {
    this.request.end(callback)
  }

  page (number) {
    this.request.query({page: number});
    return this;
  }

}
