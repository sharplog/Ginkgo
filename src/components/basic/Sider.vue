<template>
  <div id="sider">
    <i-menu theme="dark" class="side-menu" @on-select="onSelect" v-if="sideMenu.length !== 0" width="auto">
      <template v-for="item in sideMenu">
        <menu-item :name="item.url" v-if="!item.submenu" :key="item.key">
            <icon :type="item.icon" v-if="item.icon"></icon>
            {{ item.name }}
        </menu-item>
        <submenu :name="item.url" v-if="item.submenu" :key="item.key">
            <template slot="title">
                <icon :type="item.icon" v-if="item.icon"></icon>
                {{ item.name }}
            </template>
            <template v-for="subItem in item.submenu">
              <menu-item :name="subItem.url" v-if="!subItem.submenu" :key="subItem.key">
                  <icon :type="subItem.icon" v-if="subItem.icon"></icon>
                  {{ subItem.name }}
              </menu-item>
              <submenu :name="subItem.url" v-if="subItem.submenu" :key="subItem.key">
                <template slot="title">
                    <icon :type="subItem.icon" v-if="subItem.icon"></icon>
                    {{ subItem.name }}
                </template>
                  <menu-item v-for="subItem2 in subItem.submenu" :name="subItem2.url" :key="subItem2.key">
                      <icon :type="subItem2.icon" v-if="subItem2.icon"></icon>
                      {{ subItem2.name }}
                  </menu-item>
              </submenu>
            </template>
        </submenu>
      </template>
    </i-menu>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class AppSider extends Vue {
  get sideMenu (): Array<any> {
    let key = 0

    // 一级菜单
    this.$store.getters.sideMenu.forEach((item, index) => {
      item.key = ++key
      if (!item.url) {
        item.url = '*' + index
      }

      // 二级菜单
      if (item.submenu) {
        item.submenu.forEach((subitem, subindex) => {
          subitem.key = ++key
          if (!subitem.url) {
            subitem.url = '*' + index + '-' + subindex
          }

          // 三级菜单
          if (subitem.submenu) {
            subitem.submenu.forEach((subitem2, subindex2) => {
              subitem2.key = ++key
              if (!subitem2.url) {
                subitem2.url = '*' + index + '-' + subindex + '-' + subindex2
              }
            })
          }
        })
      }
    })

    return this.$store.getters.sideMenu
  }

  onSelect (name) {
    let _this: any = this
    if (name.charAt(0) !== '*') {
      _this.$router.push(name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-menu {
  background: transparent;
}
</style>
