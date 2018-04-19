<template>
  <layout>
    <i-header class="header">
      <app-header/>
    </i-header>
    <layout>
      <sider>
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

@Component({
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
    'app-sider': AppSider
  }
})

export default class Business extends Vue {
}
</script>

<style>
.header {
  text-align: left;
}
.layout-footer-center {
  display: none;
}
</style>
