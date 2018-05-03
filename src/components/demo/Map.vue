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
      <button @click="playback">轨迹回放</button>
      <button @click="pause">暂停</button>
      <button @click="resume">继续</button>
      <button @click="stop">停止</button>
      <button @click="restart">重放</button>
      <button @click="speedUp">加速</button>
      <button @click="speedDown">减速</button>
      <button @click="clearback">清除轨迹</button>
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
  speed: number = 500
  
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
    linePassedStyle: { strokeStyle: 'red' },
    
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
    speed: this.speed,
    
    // 加载了数据后是否自动进行回放，默认自动回放
    autoStart: true
  }
  
  trackData = {
  }

  trackData1 = {
    paths: [{
      name: '行驶路线1',
      path: [
        {time: '10:10:00',
          speed: 1000,
          position: [117.121815, 36.686896]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.121557, 36.68638]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.1216, 36.685519]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.121686, 36.685244]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.121858, 36.684797]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.122115, 36.684384]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.122287, 36.684246]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.122587, 36.68373]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.122802, 36.683489]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.123789, 36.682181]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.123059, 36.681802]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.122373, 36.681389]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.121643, 36.681183]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.121858, 36.680701]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.122673, 36.679565]
        }
      ]
    },
    {
      name: '行驶路线2',
      linePassedStyle: { strokeStyle: 'green' },
      path: [
        {time: '10:10:00',
          speed: 1000,
          position: [117.122673, 36.679565]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.122973, 36.679393]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.124218, 36.677569]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.12572, 36.675366]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.127222, 36.673404]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.126449, 36.672957]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.126407, 36.673026]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.125656, 36.672905]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.125012, 36.672991]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.124475, 36.672922]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.123617, 36.672871]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.122351, 36.672699]
        },
        {time: '10:10:00',
          speed: 1000,
          position: [117.11748, 36.672062]
        }]
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

  playback () { this.trackData = this.trackData1 }
  clearback () {
    // this.tracker.clear() 不需要这个
    this.trackData = null
  }
  pause () {
    this.tracker.pause()
  } 
  resume () { this.tracker.resume() }
  stop () { this.tracker.stop() }
  start () { this.tracker.start() }
  restart () { this.tracker.restart() }
  speedUp () {
    this.speed += 100
    this.tracker.setSpeed(this.speed)
  }
  speedDown () {
    if (this.speed < 100) return
    this.speed -= 100
    this.tracker.setSpeed(this.speed)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gingo-map {
  height: 560px;
}
</style>
