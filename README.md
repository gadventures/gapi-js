gapi-js
===========
A simple js client for the G Adventures' API (G API) based on [SuperAgent](https://github.com/visionmedia/superagent)

Before you can use this package you need to [signup for G API](https://developers.gadventures.com/docs/index.html)

> **Important:** as of now gapi-js only supports a subset of resources. Look in [src/gapi-resources.js](https://github.com/gadventures/gapi-js/blob/master/src/gapi-resources.js) to see the list of supported resources.

Usage
-----
First install the package

```
npm install gapi-js --save
```

Now, just create a new G API instance by passing your G API key to the constructor. By default the url will be set to `https://rest.gadventures.com`.

```javascript
import Gapi from 'gapi-js';

const g = new Gapi({ key: yourGAPIKey [, url: gApiUrl [, proxy: yourProxy]] });
```
Methods
-------

* [`get()`](#getresourceid)
* [`list()`](#list)
* [`query()`](#queryquerystring)
* [`page()`](#pagepage--pagesize)
* [`post()`, `patch()`](#post-and-patchresourceid)
* [`send()`](#sendjsonstringobject)
* [`del()`](#delresourceid)
* [`end()`](#end-error-response---)

These commands are all chainable, but must always start with a resource name.

Keep in mind, when chaining [`get()`](#getresourceid), [`list()`](#list), [`post()`](#post-and-patchresourceid), [`patch()`](#post-and-patchresourceid), and [`del()`](#delresourceid), only the last chained item will take affect on the request.
  
`gapi-js` will wait until [`end()`](#end-error-response---) is called, to make the actual server request.

Also, based on your credentials you may not have access to `post`, `patch`, and `del` methods.

#### `get(resourceId)`

Used to request a single object.

```javascript
g.countries.get(1090831)
g.end( (error, response) => {
    if( error ) {
        // do someting w/ the error object
    }else{
        // do something with the response object
    }
} )
```


#### `list()`

Request a list of items from the resource. Based on G API's pagination, by default, will return the 20 items from the first page. To change the requested page and/or the page size, look at [`page()`](#pagepage--pagesize) 

```javascript
g.places.list();  // page = 1, pageSize = 20
g.places.list().page(2)  // page = 2 , pageSize = 20
g.places.list().page(2, 15)  // page = 2 , pageSize = 15
g.end(callback);
```

#### `query(queryString)`

Querystring parameters to pass to G API.

```javascript
g.places.list().query({name: 'Station'})  // search for all places that include 'Station' in their name
```

#### `page([page [, pageSize]])`

Request a certain page. By default will request the first page with a page size of 20;

```javascript
g.places.list();             // page = 1, pageSize = 20
g.places.list().page(2)      // page = 2, pageSize = 20
g.places.list().page(2, 15)  // page = 2, pageSize = 15
```

#### `post()` and `patch(resourceId)`
Post and patch requests to G API. To pass data, you must also call [`send()`](#sendjsonstringobject) in your chain.

```javascript
g.countries.post().send({name: 'Canada', id: 'CA'}).end() // will add a new country to the `countries` resource
...
g.places.patch('1090831').send({name: 'Toronto'}); // will update the name of a resource.
g.places.end()
```

#### `send(jsonString|object)`
Allows for passing parameters to [`post()`](#post-and-patchresourceid) or [`patch()`](#post-and-patchresourceid). `send()` accepts many formats
 
```javascript

g.countries.post().send('{"name":"tj"}')  // JSON String
...
g.places.patch('1090831').send({name: 'Toronto'}) // Object

...

g.places.patch('1090831')
        .send('name=Toronto')
        .send('population=3000000') // Chaining query strings
        .end()
        
...

g.places.post()
        .send({name='Toronto'})
        .send({population=3000000})  // Chaining Objects
        .end()

```

#### `del(resourceId)`
Remove a resource from the server.

```javascript
g.places.del('8317609').end()
```

#### `end( (error, response) => {} )`
Your callback function will always be passed two arguments: `error` and `response`. If no error occurred, the first argument will be null

```javascript
g.countries
 .get('123')
 .end( (err, res) => {
    if( err ) {
        // do someting w/ the error object
    }else{
        // do something with the response object
    }
 })
```
