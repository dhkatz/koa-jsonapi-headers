koa-jsonapi-headers
===================

KoaJS Validate JSON-API Request Headers Middleware

[![Build Status](https://travis-ci.com/dhkatz/koa-jsonapi-headers.svg?branch=develop)](https://travis-ci.com/dhkatz/koa-jsonapi-headers)
[![Coverage Status](https://coveralls.io/repos/dhkatz/koa-jsonapi-headers/badge.png?branch=master)](https://coveralls.io/r/dhkatz/koa-jsonapi-headers?branch=master)  

## Overview

KoaJS middleware to validate required HTTP request headers for [JSON API](http://jsonapi.org/format/) spec.

This middleware will validate *all* requests have this header set:

```Accept: application/vnd.api+json```

This middleware will validate POST, PUT and PATCH requests have this header set:

```Content-type: application/vnd.api+json```

Validation failure will return HTTP `400 Bad Request` with the response text of a collection of objects keyed by "errors" (pretty printed here):

    {
      "errors": [
        {
          "code": "invalid_request",
          "title": "API requires header 'Content-type application/vnd.api+json' for exchanging data."
        }
      ]
    }

Code review, suggestions and pull requests very much welcome - thanks!

## Install

`npm install dhkatz/koa-jsonapi-headers`

## Usage

This middleware will throw a nested object in the application error like so:

```javascript
ctx.throw(400, JSON.stringify({
    errors: [
      {
        code: 'invalid_request',
        title: 'API requires header \'Content-type application/vnd.api+json\' for exchanging data.'
      },
    ],
}));
```

Here's an example of manual catch and re-throw:
```javascript
import headers from 'koa-jsonapi-headers';

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = JSON.parse(err.message);
  }

  ctx.type = 'application/vnd.api+json';
});

app.use(headers());
```

*Exclude List*

If you have an API endpoint that you do not want to enforce JSON API headers you can exclude it from the header validations.

There are two methods for excluding:

- Add jsonapiexclude=true to the URL query string.

Example: http://localhost:3000/signin/google?jsonapiexclude=true

If the URL query string key 'jsonapiexclude' exists (any value) the JSON API headers validation will be skipped.

- Pass in an exclude list of URL regular expression patterns when you use `app.use()'

Example:

```javascript
app.use(headers({
  exclude: [
    'signin\/google',
    'auth\/google\\?code',
  ]
}));
```

*Note:

- No start or end '/'
- The escaping of the '/' and the double escaping of the '?' as these are regular expression characters.
