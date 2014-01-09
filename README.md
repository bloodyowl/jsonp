# jsonp

[![browser support](https://ci.testling.com/bloodyowl/jsonp.png)](https://ci.testling.com/bloodyowl/jsonp)

## Install

```
$ npm install bloody-jsonp
```

## Require

```javascript
var jsonp = require("bloody-jsonp")
```

## API

### `jsonp.create(url) -> new jsonp`

Creates a new jsonp object. 

### `request.load() -> promise`

Creates a promise bound to the script loading. 
The promise gets the passed `object` as value, or an error if the loading failed. 
