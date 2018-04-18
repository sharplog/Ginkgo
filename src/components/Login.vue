<template>
  <div>
    Login
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class extends Vue {
  mounted () {
    sessionStorage.setItem('accessToken', '123456')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
