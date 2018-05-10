import http from 'axios'

// config http
// http.defaults.timeout = 2500
http.defaults.headers.post['Content-Type'] = 'application/json'
// cache-control: "max-age=0, private, must-revalidate"
// http.defaults.headers.post['Cache-control'] = 'max-age=5'

// Add a request interceptor 解决ie下url带中文参数乱码问题
http.interceptors.request.use(function (config) {
  if (config.method === 'get') {
    config.url = encodeURI(config.url)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 为请求添加Token
http.interceptors.request.use(function (config) {
  config.headers.Authorization = sessionStorage.getItem('accessToken')
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  if (error.response) {
    /* TODO
    if(error.response.status === 400 ){
      window.app.$Message.error('数据错误！')
    }
    else if(error.response.status === 401 ){
      // define window.app=vm in main.js
      window.app.$router.push({name: 'Login'})
    }
    else if(error.response.status === 403 ){
      window.app.$Message.error('您没有操作权限哦！')
    }
    else if(error.response.status === 404 ){
      window.app.$Message.error('对象不存在！')
    }
    else if(error.response.status === 500 ){
      window.app.$Message.error('服务器发生了一些错误哦！')
    }
    */
  }
  return Promise.reject(error)
})

export default http
