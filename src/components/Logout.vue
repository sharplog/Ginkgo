<template>
  <div></div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class extends Vue {
  created () {
    sessionStorage.removeItem('accessToken')
    console.log('logout')
    this.$router.push('/')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
