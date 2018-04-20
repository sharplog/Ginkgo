<template>
  <div id="header">
    <img class="logo" :src="imgSrc">
    <h1 class="title">{{ appName }}</h1>

    <i-menu mode="horizontal" theme="dark" class="top-menu" @on-select="onSelect" v-if="topMenu.length !== 0">
      <template v-for="item in topMenu">
        <menu-item :name="item.url" v-if="!item.submenu" :key="item.key">
            <icon :type="item.icon" v-if="item.icon"></icon>
            {{ item.name }}
        </menu-item>
        <submenu :name="item.url" v-if="item.submenu" :key="item.key">
            <template slot="title">
                <icon :type="item.icon" v-if="item.icon"></icon>
                {{ item.name }}
            </template>
            <menu-item v-for="subItem in item.submenu" :name="subItem.url" :key="subItem.key">
                <icon :type="subItem.icon" v-if="subItem.icon"></icon>
                {{ subItem.name }}
            </menu-item>
        </submenu>
      </template>
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

  get avatarLetter (): String {
    return this.userName ? this.userName.charAt(0) : ''
  }

  get noticeNum (): String {
    let num = this.$store.getters.noticeNum
    return num === 0 ? '' : num
  }

  get topMenu (): Array<any> {
    let key = 0

    this.$store.getters.topMenu.forEach((item, index) => {
      item.key = ++key
      if (!item.url) {
        item.url = '*' + index
      }

      if (item.submenu) {
        item.submenu.forEach((subitem, subindex) => {
          subitem.key = ++key
          if (!subitem.url) {
            subitem.url = '*' + index + '-' + subindex
          }
        })
      }
    })

    return this.$store.getters.topMenu
  }

  onSelect (name) {
    let _this: any = this
    if (name.charAt(0) !== '*') {
      _this.$router.push(name)
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
