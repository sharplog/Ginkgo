import * as Types from './Types'

let win: any = window
let AMap: any = win.AMap

export default class Painter {
  // icon的size，需要访问icon图片后取得
  iconSizes: any = {}
  // 待取得icon的size后，需要更新offset的Marker
  iconMarkers: any = {}
  amap: any
  
  constructor (private mapCom: any) {
    this.amap = mapCom.amap
  }
  
  drawMarkers (markers: Types.MarkerOptions[]) {
    console.log('Painter draw markers')
    for (let option of markers) {
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
      
      marker.g_message = option.message
      marker.g_id = option.id
      marker.setMap(this.amap)
      
      if (option.group) this.mapCom.addToOverlayGroup(marker, option.group)
      this.mapCom.addOverlay(marker)
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
