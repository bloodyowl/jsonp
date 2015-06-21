# jsonp

[![Build Status](https://travis-ci.org/bloodyowl/jsonp.svg?branch=master)](https://travis-ci.org/bloodyowl/jsonp)

## Install

```
$ npm install bloody-jsonp
```

## Require

```javascript
import jsonp from "bloody-jsonp"
```

## API

### promise jsonp(url, { timeout: number = 10000, callbackName = callback })

loads `url` as a jsonp call.

