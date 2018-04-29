import GMap from './GMap'
import * as Types from './Types'

let win: any = window
let AMap: any = win.AMap
let infoWindow = new AMap.InfoWindow()

function notNull (v) { return typeof v !== 'undefined' && v !== null }

function showMessage (event) {
  // 使用默认信息窗体框样式，显示信息内容
  if (this.gmap_message) {
    infoWindow.setContent(this.gmap_message)
    infoWindow.open(this.getMap(), event.lnglat)
  }
}

export default class Painter {
  // icon的size，需要访问icon图片后取得
  iconSizes: any = {}
  // 待取得icon的size后，需要更新offset的Marker
  iconMarkers: any = {}
  amap: any
  
  constructor (private gmap: GMap) {
    this.amap = gmap.amap
  }
  
  drawMarkers (options: Types.MarkerOptions[]) {
    for (let option of options) {
      // 已做刷新的不再画
      if (option._refreshed) continue
      
      let marker = new AMap.Marker(option)
      let size = this.getIconSize(option.icon, marker)
      
      marker.setOffset(new AMap.Pixel(-size.width / 2, -size.height))
      if (option.label) {
        let label = {
          content: option.label,
          offset: new AMap.Pixel(size.width / 2, size.height)
        }
        marker.setLabel(label)
      }
      
      this.addOverlay(Types.TYPE_MARKER, marker, option)
    }
  }
  
  drawPolylines (options: Types.PolylineOptions[]) {
    for (let option of options) {
      if (option.borderWeight || option.outlineColor) option.isOutline = true
      
      let line = new AMap.Polyline(option)
      this.addOverlay(Types.TYPE_POLYLINE, line, option)
    }
  }
  
  drawPolygons (options: Types.PolygonOptions[]) {
    for (let option of options) {
      if (!option.cursor) option.cursor = 'pointer'
      
      let polygon = new AMap.Polygon(option)
      this.addOverlay(Types.TYPE_POLYGON, polygon, option)
    }
  }
  
  drawCircles (options: any[]) {
    for (let option of options) {
      if (!option.cursor) option.cursor = 'pointer'
      
      let circle = new AMap.Circle(option)
      this.addOverlay(Types.TYPE_CIRCLE, circle, option)
    }
  }
  
  drawRectangles (options: any[]) {
    for (let option of options) {
      if (!option.cursor) option.cursor = 'pointer'
      option.bounds = new AMap.Bounds(option.southWest, option.northEast)
      
      let rectangle = new AMap.Rectangle(option)
      this.addOverlay(Types.TYPE_RECTANGLE, rectangle, option)
    }
  }
  
  addOverlay (type: string, overlay: any, option: any) {
    overlay.gmap_id = option.id ? option.id : 'gmap_' + overlay.getId()
    overlay.gmap_message = option.message
    overlay.gmap_group = option.group
    overlay.setMap(this.amap)
    
    overlay.on('click', showMessage)
    
    // 设置鼠标经过时透明度变化
    if (notNull(option.lightenOpacity) || option.lightenColor) {
      let oriOpacity = overlay.getOptions().fillOpacity
      let oriColor = overlay.getOptions().fillColor

      overlay.on('mouseover', () => overlay.setOptions(
        {
          fillOpacity: notNull(option.lightenOpacity) ? option.lightenOpacity : oriOpacity,
          fillColor: option.lightenColor ? option.lightenColor : oriColor
        })
      )
      overlay.on('mouseout', () => overlay.setOptions(
        {
          fillOpacity: oriOpacity,
          fillColor: oriColor
        })
      )
    }
    if (option.group) this.gmap.addToOverlayGroup(overlay, option.group)
    this.gmap.addOverlay(type, overlay)
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
      marker.gmap_message = option.message
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
