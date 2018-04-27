/**
 * 高德地图封装组件
 */
import * as Types from './Types'
import Painter from './Painter'

let win: any = window
let AMap: any = win.AMap

export default class GMap {
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

  constructor (el, options) {
    if (options) {
      for (let k in options) this.defaultOptions[k] = options[k]
    }
    
    this.amap = new AMap.Map(el, this.defaultOptions)
    if (AMap.Scale && this.defaultOptions.scale) {
      // debugger
      this.amap.addControl(new AMap.Scale())
    }
    
    this.painter = new Painter(this)
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
  
  destroyed = () => this.amap && this.amap.destroy()
  setZoom = zoom => this.amap.setZoom(zoom)
  getZoom = () => this.amap.getZoom()
  setCenter = center => this.amap.setCenter(center)
  getCenter = () => this.amap.getCenter()
  on = (eventName: string, callback) => this.amap.on(eventName, callback)
  showOverlayGroup = groupName => this.overlayGroups[groupName] && this.overlayGroups[groupName].show()
  hideOverlayGroup = groupName => this.overlayGroups[groupName] && this.overlayGroups[groupName].hide()
  
  drawMarkers (markers: Types.MarkerOptions[]) {
    console.log('map draw markers')
    
    // clear markers first
    this.clearOverlays('marker')
    markers && this.painter.drawMarkers(markers)
  }
  
  drawPolylines (polylines) {
    this.clearOverlays('polyline')
    polylines && this.painter.drawPolylines(polylines)
  }
   
  drawPolygons (polygons) {
    this.clearOverlays('polygon')
    polygons && this.painter.drawPolygons(polygons)
  }
  
  drawCircles (circles) {
    this.clearOverlays('circle')
    circles && this.painter.drawCircles(circles)
  }
  
  drawRectangles (rectangles) {
    this.clearOverlays('rectangle')
    rectangles && this.painter.drawRectangles(rectangles)
  }
}
