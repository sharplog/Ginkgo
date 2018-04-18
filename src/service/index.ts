/*
 * success : 请求成功执行的函数
 * fail：请求失败执行的函数
 *
 */

import http from './http'

// 有的请求需要用户认证，视情况而定
const addAuth = function () {
  let config: any = {}
  config.headers = {
    // TODO 怎么认证？添加Token？
  }
  return config
}

class Service {
  baseUrl: String = ''
  http: any = http

  get (url, success, fail) {
    return this.http.get(this.baseUrl + url, addAuth())
      .then(function (res) {
        success(res)
      })
      .catch(function (error) {
        if (fail) {
          fail(error)
        }
        console.log(error)
      })
  }

  post (url, data, success, fail) {
    return this.http.post(this.baseUrl + url,data, addAuth())
      .then(function (res) {
        success(res)
      })
      .catch(function (error) {
        if (fail) {
          fail(error)
        }
        console.log(error)
      })
  }

  put (url, data, success, fail) {
    return this.http.put(this.baseUrl + url,data, addAuth())
      .then(function (res) {
        success(res)
      })
      .catch(function (error) {
        if (fail) {
          fail(error)
        }
        console.log(error)
      })
  }

  delete (url, success, fail) {
    return this.http.delete(this.baseUrl + url, addAuth())
      .then(function (res) {
        success(res)
      })
      .catch(function (error) {
        if (fail) {
          fail(error)
        }
        console.log(error)
      })
  }

  setBaseUrl (url) { this.baseUrl = url }
}

export default new Service()
