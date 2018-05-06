<template>
  <div class="ginkgo-gmap">
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator'
import GMap from './GMap'
import Painter from './Painter'
import Tracker from './Tracker'
import Editer from './Editer'

let win: any = window
let AMap: any = win.AMap

@Component
export default class GinkgoMap extends Vue {
  name: string = 'ginkgo-gmap'
  gmap: GMap
  painter: Painter
  _tracker: any
  _editer: any
  
  @Prop() gmapObj: GMap
  @Prop() options: any
  @Prop() zoom: number
  @Prop() center: number[]
  @Prop() markers: any[]
  @Prop() polylines: any[]
  @Prop() polygons: any[]
  @Prop() circles: any[]
  @Prop() rectangles: any[]
  @Prop() texts: any[]
  @Prop() imageLayers: any[]
  @Prop() trackData: any
  @Prop() trackOptions: any
  @Prop() tracker: Tracker
  @Prop() editData: any
  @Prop() editer: Editer
  
  mounted () {
    let options = this.options ? this.options : {}
    if (this.zoom) options.zoom = this.zoom
    if (this.center) options.center = this.center
    
    this.gmap = new GMap(this.$el, options)
    this.$emit('update:gmapObj', this.gmap)
    
    // 把地图当前的中心位置和zoom返回到父组件中
    this.gmap.on('zoomend', () => { this.$emit('update:zoom', this.gmap.getZoom()) })
    this.gmap.on('moveend', () => {
      let c = this.gmap.getCenter()
      this.$emit('update:center', [c.lng, c.lat])
    })
    
    this.painter = new Painter(this.gmap)

    this.drawImageLayers()
    this.drawPolygons()
    this.drawCircles()
    this.drawRectangles()
    this.drawPolylines()
    this.drawMarkers()
    this.drawTexts()
    
    this.playback()

    if (this.editData) {
      this._editer = new Editer(this.gmap, this.syncEditData)
      this.$emit('update:editer', this._editer)
    }
  }
  
  destroyed () {
    this.gmap && this.gmap.destroy()
  }

  // 把编辑的数据返回给应用
  syncEditData (result) {
    let data: any = {}
    if (result.position) data.position = [result.position.getLng(), result.position.getLat()]
    if (result.address) data.address = result.address

    let target = result.target
    if (target instanceof AMap.Circle) {
      let center = target.getCenter()
      data.position = [center.getLng(), center.getLat()]
      data.radius = target.getRadius()
    } else if (target instanceof AMap.Rectangle) {
      let sw = target.getBounds().getSouthWest()
      let ne = target.getBounds().getNorthEast()
      data.path = []
      data.path.push([sw.getLng(), sw.getLat()])
      data.path.push([ne.getLng(), ne.getLat()])
    } else if (target instanceof AMap.Polyline || target instanceof AMap.Polygon) {
      let path = target.getPath()
      data.path = []
      for (let p of path) {
        data.path.push([p.getLng(), p.getLat()])
      }
    }

    this.$emit('update:editData', data)
  }
  
  @Watch('trackData')
  playback () {
    if (!this._tracker) {
      let opts: any = this.trackOptions ? this.trackOptions : {}
      this._tracker = new Tracker(opts, this.gmap.getAMap(), this.trackData)
      this.$emit('update:tracker', this._tracker)
    } else {
      this._tracker.playback(this.trackData)
    }
  }
  
  @Watch('markers')
  drawMarkers () {
    this.painter.drawMarkers(this.markers)
  }
  
  @Watch('polylines')
  drawPolylines () {
    this.painter.drawPolylines(this.polylines)
  }
   
  @Watch('polygons')
  drawPolygons () {
    this.painter.drawPolygons(this.polygons)
  }
  
  @Watch('circles')
  drawCircles () {
    this.painter.drawCircles(this.circles)
  }
  
  @Watch('rectangles')
  drawRectangles () {
    this.painter.drawRectangles(this.rectangles)
  }
  
  @Watch('texts')
  drawTexts () {
    this.painter.drawTexts(this.texts)
  }
  
  @Watch('imageLayers')
  drawImageLayers () {
    this.painter.drawImageLayers(this.imageLayers)
  }
  
  @Watch('zoom')
  setZoom () {
    this.gmap.setZoom(this.zoom)
  }
 
  @Watch('center')
  setCenter () {
    let c = this.gmap.getCenter()

    // 如果位置变化很小就不再调整了，否则会跟触发的update:center事件形成无限循环
    if (Math.abs(c.lng - this.center[0]) < 0.00000001 && Math.abs(c.lat - this.center[1]) < 0.00000001) return
    
    this.gmap.setCenter(this.center)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* Marker Label的样式 */
.amap-marker-label {
  border: 1px solid #b8b8b8;
  color: #646464;
  border-radius: 0px 4px 4px 4px;
}
/* 信息框内容的样式 */
.amap-info-content {
}
</style>
