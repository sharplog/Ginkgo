<template>
  <div>
    <div style="position: fixed; top: 94px; z-index: 100; padding: 2px 10px">
      <button @click="setZoom">zoom({{ zoom }})</button>
      <button @click="setCenter">c({{ center[0] }})</button>
      <button @click="setMarkers">重置点标记</button>
    </div>
    <ginkgo-map ref="map" class="gingo-map" :options="mapOptions" :zoom.sync="zoom" :center.sync="center"
        :markers="markers">
    </ginkgo-map>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import GinkgoMap from '../../plugins/map/Map.vue'

@Component({
  components: {
    'ginkgo-map': GinkgoMap
  }
})

export default class Map extends Vue {
  zoom: number = 11
  center: number[] = [117.12224, 36.67429]
  markers: any[] = [
    { id: 'mk1',
      position: [117.12224, 36.67429],
      icon: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
      label: '测试点1',
      title: '测试title1',
      group: 'group1'
    },
    { id: 'mk2',
      position: [117.32224, 36.67429],
      icon: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
      label: '测试点2',
      group: 'group2'
    },
    { id: 'mk3',
      position: [117.42224, 36.67429],
      icon: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
      label: '测试点3',
      group: 'group1'
    },
    { id: 'mk4',
      position: [117.52224, 36.67429],
      icon: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
      label: '测试点4',
      group: 'group2'
    }
  ]
  
  mapOptions: any = {
    resizeEnable: true,
    zoom: 11,
    center: [117.12224, 36.67429]
  }
  
  setZoom () {
    this.zoom = 13
  }
  
  setCenter () {
    this.center = [116.397428, 39.90923]
  }
  
  setMarkers () {
    this.markers = [
      { id: 'mk1',
        position: [117.12224, 38.67429],
        icon: 'https://www.baidu.com/img/baidu_jgylogo4.gif',
        label: '新测试点1',
        title: '新测试title1',
        group: 'group1'
      },
      { position: [117.32224, 38.67429],
        icon: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
        label: '测试点2',
        group: 'group2'
      }
    ]
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gingo-map {
  height: 560px;
}
</style>
