<template>
  <div id="header">
    <img class="logo" :src="imgSrc">
    <h1 class="title">{{ appName }}</h1>

    <i-menu mode="horizontal" theme="dark" class="top-menu" @on-select="onSelect">
        <menu-item name="/message">
            <icon type="ios-paper"></icon>
            内容管理
        </menu-item>
        <menu-item name="*2">
            <icon type="ios-people"></icon>
            用户管理
        </menu-item>
        <submenu name="*3">
            <template slot="title">
                <icon type="stats-bars"></icon>
                统计分析
            </template>
            <menu-item name="/message">
                <icon type="ios-paper"></icon>
                新增和启动
            </menu-item>
            <menu-item name="*3-2">活跃分析</menu-item>
            <menu-item name="*3-3">时段分析</menu-item>
            <menu-item name="*3-4">用户留存</menu-item>
            <menu-item name="*3-5">流失用户</menu-item>
        </submenu>
        <menu-item name="*4">
            <icon type="settings"></icon>
            综合设置
        </menu-item>
    </i-menu>

    <div class="head-right">
      <badge :count="noticeNum" style="margin-right:30px;">
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
              <p  class="dropdown-item-p">
                <icon type="android-contact"></icon>
                <span> 个人信息</span>
              </p>
            </router-link>
          </dropdown-item>
          <dropdown-item >
            <a href="" @click="logout">
              <p  class="dropdown-item-p">
                <icon type="power"></icon>
                <span>退出</span>
              </p>
            </a>
          </dropdown-item>
        </dropdown-menu>
      </dropdown>
    </div>
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
  @Getter('noticeNum') noticeNum: number

  get avatarLetter (): String {
    return this.userName ? this.userName.charAt(0) : ''
  }

  onSelect (name) {
    if (name.charAt(0) !== '*') {
      this.$router.push(name)
    }
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
.title {
  float: left;
}
.logo {
  margin-top: 9px;
  margin-right: 10px;
  height: 46px;
  float: left;
}
.top-menu {
  float: left;
  background: transparent;
  margin-left: 50px;
}
.head-right {
  float: right;
  line-height: 24px;
  margin-top: 20px;
}
.head-right a span{
  color: #666666;
}
.avatar {
  background-color: #2196f3;
}
.dropdown-item-p {
  display: block;
  width:100%;
}
</style>
