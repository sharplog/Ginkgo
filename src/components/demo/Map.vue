<template>
  <div>
    <div style="position: fixed; top: 94px; z-index: 100; padding: 2px 10px">
      <button @click="setZoom">zoom({{ zoom }})</button>
      <button @click="setCenter">c({{ center[0] }})</button>
      <button @click="setMarkers">重置点标记</button>
      <button @click="rmMakerLine">删点线面</button>
      <button @click="rmMakerLine">新建点</button>
      <button @click="rmMakerLine">新建线</button>
      <button @click="rmMakerLine">新建面</button>
      <button @click="rmMakerLine">新建圆</button>
      <button @click="rmMakerLine">新建矩形</button>
      <button @click="rmMakerLine">轨迹回放</button>
      <!-- 画线面时，设置样式。回放时能够控制 -->
    </div>
    <ginkgo-map ref="map" class="gingo-map" :gmapObj.sync="gmap" :options="mapOptions" :zoom.sync="zoom" :center.sync="center"
        :markers="markers" :polylines="polylines" :polygons="polygons" :circles="circles" :rectangles="rectangles">
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
  gmap: any = {}
  zoom: number = 11
  center: number[] = [117.12224, 36.67429]
  
  markers: any[] = [
    { id: 'mk1',
      position: [117.12224, 36.67429],
      icon: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
      label: '测试点1',
      title: '测试title1',
      message: '哈哈！It\'s me!',
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
  polylines: any[] = [
    { id: 'line1',
      path: [
        [117.12224, 36.67429],
        [117.32224, 36.72429],
        [117.42224, 36.67429]
      ],
      strokeWeight: 10,
      cursor: 'pointer',
      message: '哈哈！It\'s me!',
      outlineColor: 'red',
      strokeStyle: 'dashed',
      strokeDasharray: [15, 2, 2, 2],
      showDir: true,
      group: 'group1'
    }  
  ]
  
  polygons: any[] = [
    { id: 'gon1',
      path: [
        [116.82224, 36.67429],
        [116.82224, 36.77429],
        [116.87224, 36.80429],
        [116.92224, 36.77429],
        [116.92224, 36.67429]
      ],
      strokeWeight: 2,
      cursor: 'pointer',
      message: '哈哈！It\'s polygon!',
      fillColor: 'blue',
      fillOpacity: 0.5,
      strokeStyle: 'dashed',
      strokeDasharray: [15, 2, 2, 2],
      lightenOpacity: 0.9,
      lightenColor: 'green',
      group: 'group1'
    }  
  ]
  
  circles: any[] = [
    { id: 'circle1',
      center: [117.02224, 36.72429],
      radius: 7000,
      strokeWeight: 2,
      cursor: 'pointer',
      message: '哈哈！It\'s polygon!',
      fillColor: 'yellow',
      // fillOpacity: 0.5,
      strokeStyle: 'dashed',
      strokeDasharray: [15, 2, 2, 2],
      lightenOpacity: 0.6,
      group: 'group1'
    }  
  ]
  
  rectangles: any[] = [
    { id: 'rect1',
      southWest: [117.12224, 36.72429],
      northEast: [117.27224, 36.80429],
      radius: 7000,
      strokeWeight: 2,
      cursor: 'pointer',
      message: '哈哈！It\'s rectangle!',
      fillColor: 'green',
      fillOpacity: 0.5,
      strokeStyle: 'dashed',
      strokeDasharray: [15, 2, 2, 2],
      lightenColor: 'blue',
      group: 'group1'
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
        message: '哈哈！It\'s me too!',
        group: 'group1'
      },
      { id: 'mk5',
        position: [117.32224, 38.67429],
        icon: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
        label: '测试点2',
        message: '哈哈！It\'s me too!!!',
        group: 'group2'
      }
    ]
  }
  
  rmMakerLine () {
    // this.$refs.map.setZoom ()
    this.gmap.removeMarker('mk1')
    this.gmap.removePolyline('line1')
    this.gmap.removePolygon('gon1')
    this.gmap.removeCircle('circle1')
    this.gmap.removeRectangle('rect1')
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gingo-map {
  height: 560px;
}
</style>
