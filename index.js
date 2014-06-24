var klass = require("bloody-class")
var promise = require("bloody-promise")
var unique = -1
var configurable = {
  url : 1,
  timeout : 1,
  param : 1
}
var parent =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement

function resolveURL(url, queryString){
  var index
  if(queryString == null) {
    return url
  }
  index = url.indexOf("?")
  if(index == -1) {
      return url + "?" + queryString
  }
  if(index == url.length - 1) {
    return url + queryString
  }
  return url + "&" + queryString
}

module.exports = klass.extend({
  constructor : function(options){
    var key
    if(typeof options == "string") {
      options = {
        url : options
      }
    }
    for(key in options) {
      if(options.hasOwnProperty(key) && configurable[key]) {
        this[key] = options[key]
      }
    }
  },
  url : null,
  timeout : 10000,
  param : "callback",
  load : function(){
    var script = document.createElement("script")
    var jsonp = this
    var timeout
    var then = promise.create(function(resolve, reject){
      var cbName = "bloodyjsonp" + (++unique)
      script.onerror = function(){
        reject(new Error("script errored"))
      }
      script.src = resolveURL(jsonp.url, jsonp.param + "=" + cbName)
      window[cbName] = function(object){
        window[cbName] = null
        resolve(object)
      }
      parent.appendChild(script)
      timeout = setTimeout(function(){
        timeout = null
        reject(new Error("timeout"))
      }, jsonp.timeout)
    })
    then.done(function(){
      if(timeout) {
        clearTimeout(timeout)
      }
      if(script.parentNode) {
        script.parentNode.removeChild(script)
      }
    })
    return then
  }
})
