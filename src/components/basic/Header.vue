<template>
  <div id="header">
    <img class="logo" :src="imgSrc">
    <h1>{{ appName }}</h1>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class AppHeader extends Vue {
  imgSrc: String = 'static/img/logo.png';
  appName: String = 'Vue.js App';
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
</style>
