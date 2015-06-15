const CALLBACK_NAME = "bloodyjsonp"
let requestId = -1

const addURLQueryParam = (url, queryParam) => {
  const queryStringStart = url.indexOf("?")
  return url + (
    queryStringStart === -1 ?
      "?" :
      queryStringStart < url.length - 1 ?
        "&" :
          ""
  ) + queryParam
}

const jsonp = (url, {paramName = "callback", timeout = 10000} = {}) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    const callbackName = `${ CALLBACK_NAME }${ ++requestId }`
    script.addEventListener("error", reject, false)
    script.src = addURLQueryParam(
      url,
      `${ paramName }=${ callbackName }`
    )
    window[callbackName] = (object) => {
      window[callbackName] = null
      if(timer) {
        clearTimeout(timer)
        resolve(object)
      }
      script.parentNode.removeChild(script)
    }
    let timer = setTimeout(() => {
      timer = null
      reject(new Error(`bloody-jsonp: timeout error for ${ url }`))
    }, timeout)
    const firstScript = document.getElementsByTagName("script")[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  })
}

export default jsonp
