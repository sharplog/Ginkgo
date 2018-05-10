/*
 * success : 请求成功执行的函数
 * fail：请求失败执行的函数
 *
 */

import http from './http'

const handleError = (error, fail) => {
  if (fail) { fail(error) }
  console.log(error)
}

class Service {
  baseUrl: string = ''
  http: any = http

  get (url, success, fail) {
    return this.http.get(this.baseUrl + url)
      .then(res => success(res))
      .catch(error => handleError(error, fail))
  }

  post (url, data, success, fail) {
    return this.http.post(this.baseUrl + url, data)
      .then(res => success(res))
      .catch(error => handleError(error, fail))
  }

  put (url, data, success, fail) {
    return this.http.put(this.baseUrl + url, data)
      .then(res => success(res))
      .catch(error => handleError(error, fail))
  }

  delete (url, success, fail) {
    return this.http.delete(this.baseUrl + url)
      .then(res => success(res))
      .catch(error => handleError(error, fail))
  }

  setBaseUrl (url) { this.baseUrl = url }
}

export default new Service()
