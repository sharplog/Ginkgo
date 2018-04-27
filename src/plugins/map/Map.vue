<template>
  <div class="ginkgo-gmap">
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator'
import GMap from './GMap'

@Component
export default class GinkgoMap extends Vue {
  name: string = 'ginkgo-gmap'
  gmap: any
  
  @Prop() options: any
  @Prop() zoom: number
  @Prop() center: number[]
  @Prop() markers: any[]
  @Prop() polylines: any[]
  @Prop() polygons: any[]
  @Prop() circles: any[]
  @Prop() rectangles: any[]
  
  mounted () {
    let options = this.options ? this.options : {}
    if (this.zoom) options.zoom = this.zoom
    if (this.center) options.center = this.center
    
    this.gmap = new GMap(this.$el, options)
    
    // 把地图当前的中心位置和zoom返回到父组件中
    this.gmap.on('zoomend', () => { this.$emit('update:zoom', this.gmap.getZoom()) })
    this.gmap.on('moveend', () => {
      let c = this.gmap.getCenter()
      this.$emit('update:center', [c.lng, c.lat])
    })
    
    this.drawPolygons()
    this.drawCircles()
    this.drawRectangles()
    this.drawPolylines()
    this.drawMarkers()
  }
  
  destroyed () {
    this.gmap && this.gmap.destroy()
  }
  
  @Watch('markers')
  drawMarkers () {
    this.gmap.drawMarkers(this.markers)
  }
  
  @Watch('polylines')
  drawPolylines () {
    this.gmap.drawPolylines(this.polylines)
  }
   
  @Watch('polygons')
  drawPolygons () {
    this.gmap.drawPolygons(this.polygons)
  }
  
  @Watch('circles')
  drawCircles () {
    this.gmap.drawCircles(this.circles)
  }
  
  @Watch('rectangles')
  drawRectangles () {
    this.gmap.drawRectangles(this.rectangles)
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
.amap-marker-label {
  border: 1px solid #b8b8b8;
  color: #646464;
  border-radius: 0px 4px 4px 4px;
}
</style>
