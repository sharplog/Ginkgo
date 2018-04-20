<template>
  <div id="sider">
    <i-menu theme="dark" :class="menuitemClasses" @on-select="onSelect" v-if="sideMenu.length !== 0" width="auto">
      <template v-for="item in sideMenu">
        <menu-item :name="item.url" v-if="!item.submenu" :key="item.key">
            <icon :type="item.icon" v-if="item.icon"></icon>
            <span>{{ item.name }}</span>
        </menu-item>
        <submenu :name="item.url" v-if="item.submenu" :key="item.key">
            <template slot="title">
                <icon :type="item.icon" v-if="item.icon"></icon>
                <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.submenu">
              <menu-item :name="subItem.url" v-if="!subItem.submenu" :key="subItem.key">
                  <icon :type="subItem.icon" v-if="subItem.icon"></icon>
                  <span>{{ subItem.name }}</span>
              </menu-item>
              <submenu :name="subItem.url" v-if="subItem.submenu" :key="subItem.key">
                <template slot="title">
                    <icon :type="subItem.icon" v-if="subItem.icon"></icon>
                    <span>{{ subItem.name }}</span>
                </template>
                  <menu-item v-for="subItem2 in subItem.submenu" :name="subItem2.url" :key="subItem2.key">
                      <icon :type="subItem2.icon" v-if="subItem2.icon"></icon>
                      <span>{{ subItem2.name }}</span>
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
import { Getter } from 'vuex-class'

@Component
export default class AppSider extends Vue {
  @Getter('siderCollapsed') siderCollapsed: boolean

  get menuitemClasses (): Array<String> {
    return [
      'menu-item',
      this.siderCollapsed ? 'collapsed-menu' : ''
    ]
  }
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
.menu-item {
  background: transparent;
}
.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span{
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(3px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 18px;
}

</style>
