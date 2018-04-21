<template>
  <layout>
    <i-header class="header">
      <app-header/>
    </i-header>
    <layout>
      <sider collapsible :collapsed-width="collapsedWidth" v-model="isCollapsed" @on-collapse="onCollapse">
        <app-sider/>
      </sider>
      <layout>
        <breadcrumb>
        </breadcrumb>
        <i-content>
          <router-view/>
        </i-content>
      </layout>
    </layout>
    <i-footer class="layout-footer-center">
      <app-footer/>
    </i-footer>
  </layout>
 </template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppHeader from './basic/Header.vue'
import AppFooter from './basic/Footer.vue'
import AppSider from './basic/Sider.vue'
import * as types from '../store/mutation-types'

@Component({
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
    'app-sider': AppSider
  }
})

export default class Business extends Vue {
  collapsedWidth: number = 68
  isCollapsed: boolean = false

  // 供AppSider那边设置样式class
  onCollapse (collapsed) {
    let _this: any = this

    _this.$store.commit(types.SIDERCOLLAPSED, collapsed)
  }

  created () {
    let _this: any = this

    // 如果已经登录，加载有关数据：个人信息、菜单、权限、字典、消息数
    _this.$service.get('/userinfo.json', ({data}) => {
      _this.$store.commit(types.USERINFO, data)
    })
    _this.$service.get('/topMenu.json', ({data}) => {
      _this.$store.commit(types.TOPMENU, data)
    })
    _this.$service.get('/sideMenu.json', ({data}) => {
      _this.$store.commit(types.SIDEMENU, data)
    })
    _this.$service.get('/permission.json', ({data}) => {
      _this.$store.commit(types.PERMISSION, data)
    })
    _this.$service.get('/dictionary.json', ({data}) => {
      _this.$store.commit(types.DICTIONARY, data)
    })
    _this.$service.get('/noticeNum.json', ({data}) => {
      _this.$store.commit(types.NOTICENUM, data)
    })
  }
}
</script>

<style>
.header {
  text-align: left;
  border-bottom: 1px solid #eeddee;
}
.layout-footer-center {
  display: none;
}
</style>
