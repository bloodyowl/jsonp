import tape from "tape-catch"
import jsonp from ".."

tape("jsonp", (test) => {
  jsonp("http://api.openweathermap.org/data/2.5/weather?q=London,uk")
    .then((object) => {
      test.equal(
        object.sys.country,
        "GB",
        "received object"
      )
      test.equal(
        window["bloodyjsonp0"],
        null,
        "removed callback from global object"
      )
      test.end()
    })
})

tape("jsonp failure", (test) => {
  jsonp("http://api.openweathermap.org/data/2.5/foo?q=London,uk")
    .then(() => {
      test.fail()
    })
    .catch((err) => {
      test.pass("error is executed")
      test.ok(
        err,
        "error is correct"
      )
      test.end()
    })
})
