/*
 * success : 请求成功执行的函数
 * fail：请求失败执行的函数
 *
 */

import http from './http'

// 在header中添加token
const addAuth = function () {
  let config: any = {}
  config.headers = {
    Authorization: sessionStorage.getItem('accessToken')
  }
  return config
}

const handleError = (error, fail) => {
  if (fail) { fail(error) }
  console.log(error)
}

class Service {
  baseUrl: String = ''
  http: any = http

  get (url, success, fail) {
    return this.http.get(this.baseUrl + url, addAuth())
      .then(res => success(res))
      .catch(error => handleError(error, fail))
  }

  post (url, data, success, fail) {
    return this.http.post(this.baseUrl + url,data, addAuth())
      .then(res => success(res))
      .catch(error => handleError(error, fail))
  }

  put (url, data, success, fail) {
    return this.http.put(this.baseUrl + url,data, addAuth())
      .then(res => success(res))
      .catch(error => handleError(error, fail))
  }

  delete (url, success, fail) {
    return this.http.delete(this.baseUrl + url, addAuth())
      .then(res => success(res))
      .catch(error => handleError(error, fail))
  }

  setBaseUrl (url) { this.baseUrl = url }
}

export default new Service()
