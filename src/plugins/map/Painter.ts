import * as Types from './Types'

let win: any = window
let AMap: any = win.AMap

function notNull (v) { return typeof v !== 'undefined' && v !== null }

export default class Painter {
  // icon的size，需要访问icon图片后取得
  iconSizes: any = {}
  // 待取得icon的size后，需要更新offset的Marker
  iconMarkers: any = {}
  amap: any
  
  constructor (private gmap: any) {
    this.amap = gmap.amap
  }
  
  drawMarkers (options: Types.MarkerOptions[]) {
    console.log('Painter draw markers')
    let oldMarkers = this.gmap.getOverlays('marker')
    
    for (let i = oldMarkers.length - 1; i >= 0; i--) {
      let has = false
      for (let j = 0; j < options.length && !has; j++) {
        if (oldMarkers[i].g_id === options[j].id) {
          has = true
          this.refreshMarker(oldMarkers[i], options[j])
          options[j]._refreshed = true
          break
        }
      }
      
      // 删除options中不存在的Marker
      !has && this.gmap.removeMarkerByIndex(i)
    }
    
    // 画原来不存在的Marker
    for (let option of options) {
      if (option._refreshed) continue
      
      let mo: any = {}
      mo.position = option.position
      mo.title = option.title
      mo.icon = option.icon
      let marker = new AMap.Marker(mo)
      
      let size = this.getIconSize(mo.icon, marker)
      
      marker.setOffset(new AMap.Pixel(-size.width / 2, -size.height))
      if (option.label) {
        let label = {
          content: option.label,
          offset: new AMap.Pixel(size.width / 2, size.height)
        }
        marker.setLabel(label)
      }
      
      marker.g_id = option.id
      marker.g_message = option.message
      marker.g_group = option.group
      marker.setMap(this.amap)
      
      if (option.group) this.gmap.addToOverlayGroup(marker, option.group)
      this.gmap.addOverlay('marker', marker)
    }
  }
  
  drawPolylines (lines: any[]) {
    return []
  }
  
  drawPolygons (polygons: any[]) {
    return []
  }
  
  drawCircles (circles: any[]) {
    return []
  }
  
  drawRectangles (rectangles: any[]) {
    return []
  }
  
  /**
   * title、label、message，如果没有值，则不刷新它们；如果为空串，则置为空串
   */
  refreshMarker (marker, option) {
    if (option.position && option.position.length > 0) {
      marker.setPosition(new AMap.LngLat(option.position[0], option.position[1]))
    }
    // 更新Label
    if (notNull(option.label)) {
      if (option.label === '') {
        marker.setLabel({})
      } else {
        let label = marker.getLabel()
        if (!notNull(label) || option.label !== label.content) {
          let offset = marker.getOffset()
          marker.setLabel({
            content: option.label,
            offset: new AMap.Pixel(-offset.getX(), -offset.getY())
          })
        }
      }
    }
    // 更新icon
    if (notNull(option.icon) && option.icon !== marker.getIcon()) {
      marker.setIcon(option.icon)
      
      let size = this.getIconSize(option.icon, marker)
      marker.setOffset(new AMap.Pixel(-size.width / 2, -size.height))
      if (option.label) {
        let label = {
          content: option.label,
          offset: new AMap.Pixel(size.width / 2, size.height)
        }
        marker.setLabel(label)
      }
    }
    
    if (notNull(option.title) && option.title !== marker.getTitle()) {
      marker.setTitle(option.title)
    }
    if (notNull(option.message)) {
      marker.g_message = option.message
    }
  }

  getIconSize (icon: string, marker: any) {
    let defaultSize = { width: 0, height: 0 }
    let _this = this
    let size = this.iconSizes[icon]
    if (size) return size
    
    // 把Marker存起来，待取得size后更新之
    let markers = this.iconMarkers[icon]
    
    // 有markers，说明正在取icon的size，返回值大于1说明没有处理完
    if (markers && markers.push(marker) > 1) {
      return defaultSize
    }
    
    markers = [marker]
    this.iconMarkers[icon] = markers
    let iconImg = new Image()
    
    // 设置回调，取得icon的sizer后进行处理
    iconImg.onload = function () {
      let isize = new AMap.Size(iconImg.width, iconImg.height)
      _this.iconSizes[icon] = isize
      
      // 逐个调整Marker
      while (markers.length > 0) {
        let mk = markers.shift()
        
        // 如果marker当前还是这个Icon，就重新设置一下
        if (mk.getIcon().toString() === icon) {
          mk.setOffset(new AMap.Pixel(-isize.width / 2, -isize.height))
          
          let label = mk.getLabel()
          if (label) {
            label.offset = new AMap.Pixel(isize.width / 2, isize.height)
            mk.setLabel(label)
          }
        }
      }
    }
    iconImg.src = icon
    
    return defaultSize
  }
}
