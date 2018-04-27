<template>
  <div class="ginkgo-amap">
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator'
import Painter from './Painter'

let win: any = window
let AMap: any = win.AMap

@Component
export default class GinkgoMap extends Vue {
  name: string = 'ginkgo-amap'
  defaultOptions: any = {
    resizeEnable: true,
    scale: true
  }
  amap: any
  painter: Painter
  
  // 已经画好的覆盖物
  overlays: any = {
    marker: [],
    polyline: [],
    polygon: [],
    circle: [],
    rectangle: []
  }
    
  // 覆盖物分组，便于控制
  overlayGroups: any = {}

  @Prop() options: any
  @Prop() zoom: number
  @Prop() center: number[]
  @Prop() markers: any[]
  @Prop() polylines: any[]
  @Prop() polygons: any[]
  @Prop() circles: any[]
  @Prop() rectangles: any[]
  
  mounted () {
    if (this.options) {
      for (let k in this.options) this.defaultOptions[k] = this.options[k]
    }
    
    let amap = new AMap.Map(this.$el, this.defaultOptions)
    if (this.zoom) amap.setZoom(this.zoom)
    if (this.center) amap.setCenter(this.center)
    if (AMap.Scale && this.defaultOptions.scale) {
      // debugger
      amap.addControl(new AMap.Scale())
    }
    
    // 把地图当前的中心位置和zoom返回到父组件中
    amap.on('zoomend', () => { this.$emit('update:zoom', amap.getZoom()) })
    amap.on('moveend', () => {
      let c = amap.getCenter()
      this.$emit('update:center', [c.lng, c.lat])
    })
    
    this.amap = amap
    this.painter = new Painter(this)
    
    this.drawPolygons()
    this.drawCircles()
    this.drawRectangles()
    this.drawPolylines()
    this.drawMarkers()
  }
  
  destroyed () {
    this.amap && this.amap.destroy()
  }
  
  addOverlay = (type: string, ol: any) => this.overlays[type].push(ol)
  
  getOverlays = (type: string) => this.overlays[type]
  
  addToOverlayGroup (ol: any, groupName: string) {
    let group = this.overlayGroups[groupName]
    if (!group) {
      group = new AMap.OverlayGroup()
      this.overlayGroups[groupName] = group
    }
    group.addOverlay(ol)
  }
  
  delFromOverlayGroup (ol: any, groupName: string) {
    let group = this.overlayGroups[groupName]
    group && group.removeOverlay(ol)
  }
  
  clearOverlays (type: string) {
    while (this.overlays[type].length > 0) {
      let ol = this.overlays[type].shift()
      ol.setMap(null)
      if (ol.g_group) {
        this.overlayGroups[ol.g_group].removeOverlay(ol)
      }
    }
  }
  
  removeMarker (marker: any) {
    let markers = this.getOverlays('marker')
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].g_id === marker.g_id) {
        return this.removeMarkerByIndex(i)
      }
    }
  }
  
  removeMarkerByIndex (index: number) {
    let mks = this.getOverlays('marker').splice(index, 1)
    if (mks && mks.length > 0) {
      let mk = mks[0]
      mk.g_group && this.delFromOverlayGroup(mk, mk.g_group)
      mk.setMap(null)
    }
  }
  
  @Watch('markers')
  drawMarkers () {
    console.log('map draw markers')
    
    // clear markers first
    this.clearOverlays('marker')
    this.markers && this.painter.drawMarkers(this.markers)
  }
  
  @Watch('polylines')
  drawPolylines () {
    this.clearOverlays('polyline')
    this.polylines && this.painter.drawPolylines(this.polylines)
  }
   
  @Watch('polygons')
  drawPolygons () {
    this.clearOverlays('polygon')
    this.polygons && this.painter.drawPolygons(this.polygons)
  }
  
  @Watch('circles')
  drawCircles () {
    this.clearOverlays('circle')
    this.circles && this.painter.drawCircles(this.circles)
  }
  
  @Watch('rectangles')
  drawRectangles () {
    this.clearOverlays('rectangle')
    this.rectangles && this.painter.drawRectangles(this.rectangles)
  }
  
  @Watch('zoom')
  setZoom () {
    this.amap.setZoom(this.zoom)
  }
 
  @Watch('center')
  setCenter () {
    let c = this.amap.getCenter()

    // 如果位置变化很小就不再调整了，否则会跟触发的update:center事件形成无限循环
    if (Math.abs(c.lng - this.center[0]) < 0.00000001 && Math.abs(c.lat - this.center[1]) < 0.00000001) return
    
    this.amap.setCenter(this.center)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.amap-marker-label {
  border: 1px solid #b8b8b8;
  color: #646464;
  border-radius: 0px 4px 4px 4px;
}
</style>
