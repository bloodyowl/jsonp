var tape = require("tape")
  , jsonp = require("../")

tape("jsonp._resolveUrl", function(test){

  test.equal(jsonp._resolveUrl("foo", "bar=baz"), "foo?bar=baz")
  test.equal(jsonp._resolveUrl("foo?", "bar=baz"), "foo?bar=baz")
  test.equal(jsonp._resolveUrl("foo?foo=bar", "bar=baz"), "foo?foo=bar&bar=baz")
  test.end()

})

tape("jsonp", function(test){
  
  test.plan(3)
  
  var fetcher = jsonp.create("http://api.openweathermap.org/data/2.5/weather?q=London,uk")
    , firstName
  
  fetcher
    .load()
    .then(function(object){
      test.equal(object.sys.country, "GB", "received object")
      test.equal(window["bloodyjsonp0"], null, "removed callback from global object")
    })
    .then(function(){
      return fetcher.load()
    })
    .then(function(object){
      test.equal(window["bloodyjsonp1"], null, "updates fetcher name")
    })
  
})

tape("jsonp failure", function(test){

  test.plan(2)
  var fetcher = jsonp.create("http://api.openweathermap.org/data/2.5/foo?q=London,uk")

  fetcher
    .load()
    .then(function(){
      test.fail("shouln't execute successCallback")
    }, function(err){
      test.pass("should execute rejectCallback")
      test.ok(Error.prototype.isPrototypeOf(err), "gets error")
    })

})
