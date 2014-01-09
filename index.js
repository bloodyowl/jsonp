var klass = require("bloody-class")
  , promise = require("bloody-promise")
  , uniq = -1

module.exports = klass.extend({
  timeout : 10 * 1000,
  _callbackName : "bloodyjsonp",
  constructor : function(url){
    this.url = url
  },
  _createCallback : function(name, p, timeout, removeScript){
    var self = this
    return self.callback = function(object){
      if(timeout) clearTimeout(timeout)
      p.fulfill(object)
      window[name] = null
      removeScript()
    }
  },
  _resolveUrl : function(baseUrl, queryString){
    switch(baseUrl.indexOf("?")) {
      case -1:
      return baseUrl + "?" + queryString
      break
      case baseUrl.length - 1:
      return baseUrl + queryString
      break
      default:
      return baseUrl + "&" + queryString
    }
  },
  _initTimeout : function(name, p, removeScript){
    return setTimeout(function(){
      p.reject(new Error("script timeout"))
      window[name] = null
      removeScript()
    }, this.timeout)
  },
  _createErrorCallback : function(name, p, timeout, removeScript){
    return function(){
      if(timeout) clearTimeout(timeout)
      p.reject(new Error("script errored"))
      window[name] = null
      removeScript()
    }
  },
  _removeScript : function(script){
    return function(){
      if(script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  },
  load : function(){
    var self = this
    return promise.create(function(p){
      var script = document.createElement("script")
        , parent =
            document.head ||
            document.getElementsByTagName("head")[0] ||
            document.documentElement
        , name = self._callbackName + (++uniq)
        , removeScript = self._removeScript(script)
        , timeout = self._initTimeout(name, p, removeScript)
      script.type = "text/javascript"
      window[name] = self._createCallback(name, p, timeout, removeScript)
      script.onerror = self._createErrorCallback(name, p, timeout, removeScript)
      script.src = self._resolveUrl(self.url, "callback=" + name)
      parent.appendChild(script)
    })
  }
})
