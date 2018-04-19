<template>
  <div id="header">
    <img class="logo" :src="imgSrc">

    <div class="headright">
      <badge count="100" style="margin-right:30px;">
        <router-link to="/message">
          <icon type="android-notifications" size="24" style="margin-right:6px"></icon>
        </router-link>
      </badge>
      <dropdown>
        <avatar class="avatar">{{ avatarLetter }}</avatar>
        <a href="javascript:void(0)">
            {{ userName }}
            <icon type="arrow-down-b"></icon>
        </a>
        <dropdown-menu slot="list">
          <dropdown-item>
            <router-link to="/profile">
              <icon type="android-contact"></icon>
              <span> 个人信息</span>
            </router-link>
          </dropdown-item>
          <dropdown-item >
            <a href="" @click="logout">
                <icon type="power"></icon>
                <span>退出</span>
            </a>
          </dropdown-item>
        </dropdown-menu>
      </dropdown>
    </div>
    <h1>{{ appName }}</h1>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class AppHeader extends Vue {
  imgSrc: String = 'static/img/logo.png';
  @Getter('appName') appName: String
  @Getter('userName') userName: String

  get avatarLetter (): String {
    return this.userName ? this.userName.substr(0, 1) : ''
  }

  logout () {
    sessionStorage.removeItem('accessToken')
    this.$router.push('/')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
  color: #ffffff;
}
.logo {
  margin-top: 9px;
  margin-right: 10px;
  height: 46px;
  float: left;
}
.headright {
  float: right;
  line-height: 24px;
  margin-top: 20px;
}
.headright a span{
  color: #666666;
}
.avatar {
  background-color: #2196f3;
}
</style>
