<template>
  <div id="header">
    <img class="logo" :src="imgSrc">

    <div class="headright">
      <Badge count="100" style="margin-right:20px;">
        <router-link to="/message">
          <Icon type="android-notifications" size="24" style="margin-right:6px"></Icon>
        </router-link>
      </Badge>
      <Dropdown>
        <Avatar class="avatar">{{ avatarLetter }}</Avatar>
        <a href="javascript:void(0)">
            {{ userName }}
            <Icon type="arrow-down-b"></Icon>
        </a>
        <Dropdown-menu slot="list">
          <Dropdown-item>
            <router-link to="/profile">
              <Icon type="android-contact"></Icon>
              <span> 个人信息</span>
            </router-link>
          </Dropdown-item>
          <Dropdown-item >
            <a href="" @click="logout">
              <p>
                <Icon type="power"></Icon>
                <span>退出</span>
              </p>
            </a>
          </Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </div>
    <h1>{{ appName }}</h1>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class AppHeader extends Vue {
  imgSrc: String = 'static/img/logo.png';
  @Getter('appName') appName: String
  @Getter('userName') userName: String

  get avatarLetter (): String {
    return this.userName.substr(0, 1)
  }

  logout () {
  }
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
.headright {
  float: right;
  line-height: 24px;
  margin-top: 20px;
}
.headright a span{
  color: #666666;
}

.avatar {
  background-color: #2196f3;
}
</style>
