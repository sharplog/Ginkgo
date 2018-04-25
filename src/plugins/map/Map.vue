<template>
  <div class="ginkgo-map">
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class AppFooter extends Vue {
  name: String = 'AppFooter';
  msg: String = '';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
