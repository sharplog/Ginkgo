<template>
  <div id="app" class="layout">
    <Layout>
      <Header>
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
  </div>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
