import Config from '../config.js'

const config = Config
const loginURL = '/login'
const homeURL = '/'

// 两种避免验证的方式
const needLogin = to => to.meta.needAuth !== false && !config.whiteList.test(to.path)

// 判断当前用户是否具有要求的权限
const hasPerm = requiredPerm => {
  let reg = new RegExp(requiredPerm)
  let perms = JSON.parse(sessionStorage.getItem('permission'))

  if (perms && perms.length > 0) {
    for (let one of perms) {
      if (one === requiredPerm) return true

      let mg = one.match(requiredPerm)
      if (mg && mg[0] === one) return true
    }
  }
  return false
}

// beforeEach拦截器
export const before = {
  // 登录验证
  loginInterceptor: (to, from, next) => {
    if (sessionStorage.getItem('accessToken') || !needLogin(to)) {
      next()
    } else {
      sessionStorage.setItem('beforeLogin', to.path)
      next({ path: loginURL })
    }
  },

  // 基于菜单做url的访问权限验证
  permInterceptor: (to, from, next) => {
    if (!needLogin(to)) {
      next()
      return
    }

    if (to.meta.hasSubPerm === true) { // 本url有更细的权限控制
      if (hasPerm(to.fullPath)) {
        next()
        return
      }
    } else {
      if (hasPerm(to.path)) {
        next()
        return
      }
    }

    // 以恰当的形式给出提示
    console.log('No permission!')
    next({ path: '/no-permission' })
  }
}

// afterEach拦截器
export const after = {
}
