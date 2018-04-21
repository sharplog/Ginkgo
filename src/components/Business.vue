<template>
  <layout>
    <i-header class="header">
      <app-header/>
    </i-header>
    <layout>
      <sider ref="sider" hide-trigger collapsible :collapsed-width="collapsedWidth" v-model="isCollapsed" @on-collapse="onCollapse">
        <div @click="collapsedSider" class="collapseDiv">
          <Icon :class="rotateIcon" type="navicon-round" size="16"></Icon>
        </div>
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
  collapsedWidth: number = 64
  isCollapsed: boolean = false

  get rotateIcon (): Array<String> {
    return [
      'menu-icon',
      this.isCollapsed ? '' : 'rotate-icon'
    ]
  }

  collapsedSider () {
    let sider: any = this.$refs.sider
    sider.toggleCollapse()
  }

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
.menu-icon{
  color: #aeb9c2;
  margin-top: 6px;
  transition: all .3s;
}
.rotate-icon{
    transform: rotate(-90deg);
}
.collapseDiv {
  width:100%;
  text-align:center;
  background:#42485b;
  height: 30px;
  cursor: pointer;
}
</style>
