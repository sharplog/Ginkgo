<template>
  <div>
    <div style="position: fixed; top: 94px; z-index: 100; padding: 2px 10px">
      <button @click="setZoom">zoom({{ zoom }})</button>
      <button @click="setCenter">c({{ center[0] }})</button>
      <button @click="setMarkers">重置点标记</button>
      <button @click="rmMakerLine">删单个点线面</button>
      <button @click="rmAll">删所有点线面</button>
      <button @click="rmMakerLine">新建点</button>
      <button @click="rmMakerLine">新建线</button>
      <button @click="rmMakerLine">新建面</button>
      <button @click="rmMakerLine">新建圆</button>
      <button @click="rmMakerLine">新建矩形</button>
      <button @click="rmMakerLine">轨迹回放</button>
      <!-- 画线面时，设置样式。回放时能够控制 -->
    </div>
    <ginkgo-map ref="map" class="gingo-map" :gmapObj.sync="gmap" :options="mapOptions" :zoom.sync="zoom" :center.sync="center"
        :markers="markers" :polylines="polylines" :polygons="polygons" :circles="circles" :rectangles="rectangles" :texts="texts"
        :trackData="trackData" :trackOptions="trackOptions" :tracker.sync="tracker">
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
  tracker: any = {}
  
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
      message: '哈哈！It\'s circle!',
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
  
  texts: any[] = [
    {
      id: 'text1',
      text: '测试文本',
      position: [117.12224, 36.67429],
      angle: 30,
      message: '我是测试文本',
      style: {
        fontSize: '20px'
      }
    }
  ]
  
  trackOptions = {
    // 轨迹线的样式，默认不显示
    lineStyle: {},
    
    // 走过的轨迹线的样式
    passedLineStyle: { strokeStyle: 'red' },
    
    // 回放器的样式
    navigatorStyle: {
      width: 32, // 巡航器形状宽度

      height: 15, // 巡航器形状高度

      initRotateDegree: 90,
      icon: '/static/img/car.png'
    },
    
    // 循环播放
    loop: false,
    
    // 巡航速度，单位千米/小时
    speed: 1000000,
    
    // 加载了数据后是否自动进行回放，默认自动回放
    autoStart: true
  }
  
  trackData = {
    paths: [{
      name: '飞行路线0',
      path: [
        {time: '10:10:00',
          speed: 1000,
          position: [116.405289, 39.904987],
          message: '第一个点'
        },
        {time: '10:10:00',
          speed: 1000,
          position: [113.964458, 40.54664]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [111.47836, 41.135964]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [108.949297, 41.670904]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [106.380111, 42.149509]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [103.774185, 42.56996]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [101.135432, 42.930601]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [98.46826, 43.229964],
          message: '中间的点啊'
        },
        {time: '10:10:00',
          speed: 1000,
          position: [95.777529, 43.466798]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [93.068486, 43.64009]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [90.34669, 43.749086]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [87.61792, 43.793308]
        }
      ]
    }]
  }
  
  mapOptions: any = {
    resizeEnable: true,
    zoom: 11,
    center: [117.12224, 36.67429],
    mapType: 0,
    scaleOffset: [40, 40],
    scalePosition: 'LT'
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
  
  // 通过设置数据的方式删除原来画的点线面
  rmAll () {
    this.markers = []
    this.polylines = []
    this.polygons = null
    this.circles = null
    
    // let undefined: any
    this.rectangles = undefined
    this.texts = null
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gingo-map {
  height: 560px;
}
</style>
