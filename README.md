gapi-client
===========
A simple js client for gapi based on SuperAgent

__This project is still in alpha phase and not ready for actual use__

Usage
-----

First, create a new Gapi instance by passing your Gapi key to the constructor.

```
import Gapi from 'gapi-client';

const g = new Gapi(<your-gapi-key>);
```

Using this instance you can make your requests.

```
g.get(<resource-full-url>)
g.end( (error, response) => {
    if( error) {
        // do someting w/ the error
    }else{
        // do something with the response
    }
} )
```

As of now, only `get`, `post`, `patch`, `del`, and `end` is supported.

Added Features
--------------

Page requests can be made using the `page()` method.

```
g.get(<resource-full-url>)
g.page(2) // will make a request for the second page of results
```

Gapi Client also supports `post`, `patch`, and `del` methods.

Features to Come
----------------

* Make a request for data on all pages of a resource
* Make requests by resource name
* Easier Gapi search functionality
