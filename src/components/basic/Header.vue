<template>
  <div id="header">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class AppHeader extends Vue {
  name: String = 'AppHeader';
  msg: String = 'Vue.js App';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
  color: #ffffff;
}
</style>
