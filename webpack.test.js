import "es5-shim"
import "es5-shim/es5-sham"
import "babel/polyfill"

if(typeof Object.assign !== "function") {
  Object.assign = assign
}

var context = require.context("./src", true, /__tests__\/\S+\.js$/)
context.keys().forEach(context)
