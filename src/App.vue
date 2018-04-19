<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({})

export default class App extends Vue {
  created () {
    let _this: any = this

    // 初始化APP配置
    _this.$service.http.get('/static/conf/app.conf.json').then(({data}) => {
      _this.$store.commit('appConf', data)
      _this.$service.setBaseUrl(data.baseURL)
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="less">
  @import './theme/index.less';
</style>
