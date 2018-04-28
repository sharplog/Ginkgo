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
    marker: {},
    polyline: {},
    polygon: {},
    circle: {},
    rectangle: {}
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
  
  addOverlay = (type: string, ol: any) => {
    let ol0 = this.overlays[type][ol.gmap_id]
    if (ol0 && ol0 !== ol) ol0.setMap(null)
    this.overlays[type][ol.gmap_id] = ol
  }
  
  getOverlays = (type: string) => this.overlays[type]
  
  addToOverlayGroup (ol: any, groupName: string) {
    let group = this.overlayGroups[groupName]
    if (!group) {
      group = new AMap.OverlayGroup()
      this.overlayGroups[groupName] = group
    }
    group.addOverlay(ol)
  }
  
  delFromOverlayGroup (overlay: any) {
    let group = this.overlayGroups[overlay.gmap_group]
    group && group.removeOverlay(overlay)
  }
  
  clearOverlays (type: string) {
    let ols = this.overlays[type]
    for (let id in ols) {
      let ol = ols[id]
      ol.setMap(null)
      if (ol.gmap_group) {
        this.overlayGroups[ol.gmap_group].removeOverlay(ol)
      }
      delete ols[id]
    }
  }
  
  removeMarker = (gmapId: string) => this.removeOverlayById('marker', gmapId)
  removePolyline = (gmapId: string) => this.removeOverlayById('polyline', gmapId)
  removePolygon = (gmapId: string) => this.removeOverlayById('polygon', gmapId)
  removeCircle = (gmapId: string) => this.removeOverlayById('circle', gmapId)
  removeRectangle = (gmapId: string) => this.removeOverlayById('rectangle', gmapId)

  removeOverlayById (type: string, gmapId: string) {
    let overlay = this.getOverlays(type)[gmapId]
    if (!overlay) {
      console.warn(type + '[gmap_id: ' + gmapId + '] is not found.')
      return
    }
    
    overlay.setMap(null)
    overlay.gmap_group && this.delFromOverlayGroup(overlay)
    delete this.getOverlays(type)[overlay.gmap_id]
  }
  
  destroy = () => this.amap && this.amap.destroy()
  setZoom = (zoom: number) => this.amap.setZoom(zoom)
  getZoom = () => this.amap.getZoom()
  setCenter = (center: number[]) => this.amap.setCenter(center)
  getCenter = () => this.amap.getCenter()
  on = (eventName: string, callback) => this.amap.on(eventName, callback)
  showOverlayGroup = groupName => this.overlayGroups[groupName] && this.overlayGroups[groupName].show()
  hideOverlayGroup = groupName => this.overlayGroups[groupName] && this.overlayGroups[groupName].hide()
  
  /**
   * 画点标记
   * 将已有的跟将要画的按id进行比较：
   * 1）原来有，现在没有的，删除；
   * 2）原来有，现在也有的，刷新；
   * 3）原来没有，现在有的，添加。
   */
  drawMarkers (options: Types.MarkerOptions[]) {
    console.log('map draw markers')
    
    let mkoptions = options ? options : [] 
    let curMarkers = this.getOverlays('marker')
    
    // 查找已经存在的，进行刷新
    for (let i = 0; i < mkoptions.length; i++) {
      let marker = curMarkers[mkoptions[i].id]
      if (marker) {
        this.painter.refreshMarker(marker, mkoptions[i])
        mkoptions[i]._refreshed = true
        marker.gmap_refreshed = true
      }
    }
      
    // 删除那些没有被刷新的Marker
    for (let id in curMarkers) {
      if (!curMarkers[id].gmap_refreshed) {
        curMarkers[id].setMap(null)
        delete curMarkers[id]
      } else {
        delete curMarkers[id].gmap_refreshed
      }
    }
    
    this.painter.drawMarkers(mkoptions)
  }
  
  drawPolylines (options) {
    this.clearOverlays('polyline')
    options && this.painter.drawPolylines(options)
  }
   
  drawPolygons (options) {
    this.clearOverlays('polygon')
    options && this.painter.drawPolygons(options)
  }
  
  drawCircles (options) {
    this.clearOverlays('circle')
    options && this.painter.drawCircles(options)
  }
  
  drawRectangles (options) {
    this.clearOverlays('rectangle')
    options && this.painter.drawRectangles(options)
  }
}
