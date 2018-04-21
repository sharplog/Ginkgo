<template>
  <div>
    <div class="title">
      <h1>{{ appName }}</h1>
    </div>
    <i-form ref="loginData" :model="loginData" :rules="rules" class="form">
      <form-item prop="user">
        <i-input type="text" v-model="loginData.user" placeholder="登录名" clearable>
          <icon type="ios-person-outline" slot="prepend"></icon>
        </i-input>
      </form-item>
      <form-item prop="password">
        <i-input type="password" v-model="loginData.password" placeholder="登录密码" clearable>
          <icon type="ios-locked-outline" slot="prepend"></icon>
        </i-input>
      </form-item>
      <form-item class="loginButton">
        <i-button style="width:100%" type="primary" @click="handleSubmit()">登录</i-button>
      </form-item>
    </i-form>
    <div class="footer">
      {{ appVendor }}
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Login extends Vue {
  @Getter('appName') appName: String
  @Getter('appVendor') appVendor: String

  loginData: any = {
    user: '',
    password: ''
  }

  rules: any = {
    user: [
      { required: true, message: '请填写登录名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请填写登录密码.', trigger: 'blur' }
    ]
  }

  handleSubmit () {
    let _this: any = this

    // 正式使用应该用post，在此由于用mock文件，只能用get来取
    // _this.$service.post('/login_url', _this.loginData, ({data}) => {
    _this.$service.get('/token.json', ({data}) => {
      sessionStorage.setItem('accessToken', data.token)

      let url = sessionStorage.getItem('beforeLogin')
      if (url) {
        sessionStorage.setItem('beforeLogin', '')
        _this.$router.push(url)
      } else {
        _this.$router.push('/')
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  margin-top: 100px;
  text-align: center;
}
.form {
  width: 320px;
  margin: 60px auto;
}
.loginButton {
  text-align: center;
}
.footer {
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 20px;}
</style>
