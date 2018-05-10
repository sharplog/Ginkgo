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
  debugger
  if (error.response) {
    if (error.response.status === 400) {
      showError(error.message ? error.message : '请求无效，可能参数错误！')
    } else if (error.response.status === 401) {
      showError(error.message ? error.message : '您还没有登录！')
    } else if (error.response.status === 403) {
      showError(error.message ? error.message : '您没有操作权限！')
    } else if (error.response.status === 404) {
      showError(error.message ? error.message : '访问的数据不存在！')
    } else if (error.response.status === 500) {
      showError(error.message ? error.message : '服务器发生了一些错误！')
    }
  }
  return Promise.reject(error)
})

function showError (error: string) {
  let win: any = window

  win.app.$Message.error({
    content: error,
    duration: 30,
    closable: true
  })
}
export default http
