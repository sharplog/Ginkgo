<template>
  <Layout>
    <Header class="header">
      <AppHeader/>
    </Header>
    <Layout>
      <Sider>
        <AppSider/>
      </Sider>
      <Layout>
        <Breadcrumb>
        </Breadcrumb>
        <Content>
          <router-view/>
        </Content>
      </Layout>
    </Layout>
    <Footer class="layout-footer-center">
      <AppFooter/>
    </Footer>
  </Layout>
 </template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AppHeader from './basic/Header.vue'
import AppFooter from './basic/Footer.vue'
import AppSider from './basic/Sider.vue'

@Component({
  components: {
    AppHeader,
    AppFooter,
    AppSider
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
