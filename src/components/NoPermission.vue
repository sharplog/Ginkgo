<template>
  <div>
    <div class="title">
      <h1>您没有访问权限!</h1>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  margin-top: 100px;
  text-align: center;
}
</style>
