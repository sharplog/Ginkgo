/*
 * success : 请求成功执行的函数
 * fail：请求失败执行的函数
 *
 */

import http from './http'

// 有的请求需要用户认证，视情况而定
const getConfig = function (auth) {
  let config: any = {}
  if (auth) {
    config.headers = {
      'Authorization': auth
    }
  }
  return config
}

const request = {
  get: function (url,auth,success,fail) {
    return http.get(url,getConfig(auth))
      .then(function (res) {
        success(res)
      })
      .catch(function (error) {
        if (fail) {
          fail(error)
        }
        console.log(error)
      })
  },
  post: function (url,data,auth,success,fail) {
    return http.post(url,data,getConfig(auth))
      .then(function (res) {
        success(res)
      })
      .catch(function (error) {
        if (fail) {
          fail(error)
        }
        console.log(error)
      })
  },
  put: function (url,data,auth,success,fail) {
    return http.put(url,data,getConfig(auth))
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
}
export default request
