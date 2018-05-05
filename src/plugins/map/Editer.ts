/**
 * 覆盖物编辑器
 * 如果是新建，创建完成后，就从地图上消失。应用如果想继续显示，就重新画。
 * 如果是编辑已经有的，修改完成后，仍然显示在地图上。
 * 编辑过程允许取消编辑，如果是新建，取消后，没有完成的内容从地图上消失，退出编辑状态；
 * 如果是修改，取消后，恢复到编辑前的状态，退出编辑状态。
 */
import GMap from './GMap'
import * as Types from './Types'

let win: any = window
let AMapUI: any = win.AMapUI

export default class Editer {
  amap: any
  posPicker: any

  // 被编辑的Marker及其位置
  marker: any
  markerPosition: any

  constructor (private gmap: GMap, private handler: any) {
    this.amap = gmap.getAMap()
  }

  // 创建新Marker
  createMarker (marker: Types.EditMarkerOptions, position?: any) {
    let _this = this
    this.cancelEdit()

    let options: any = { map: this.amap }
    options.mode = marker.mode ? marker.mode : 'dragMap'
    if (marker.icon) {
      options.iconStyle = {
        url: marker.icon,
        ancher: marker.ancher,
        size: marker.size
      }
    }

    AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
      let positionPicker = new PositionPicker(options)
      positionPicker.on('success', function (e) {
        _this.markerPosition = e.position
        _this.handler(e)
      })
      positionPicker.start(position)
      _this.posPicker = positionPicker
    })
  }

  // 编辑原有Marker
  editMarker (markerId: string, marker: Types.EditMarkerOptions) {
    this.cancelEdit()

    this.marker = this.gmap.getMarker(markerId)
    if (!this.marker) {
      console.error('Can not find Marker[id: ' + markerId + ']')
      return
    }

    this.marker.hide()
    this.createMarker(marker, this.marker.getPosition())
  }

  cancelEdit () {
    this.stopEditMarker(false)
  }

  finishEdit () {
    this.stopEditMarker(true)
  }

  stopEditMarker (toNew: boolean) {
    if (this.posPicker) {
      this.posPicker.stop()
      delete this.posPicker

      // 如果编辑Marker，将其移到新位置
      if (this.marker) {
        this.marker.show()
        toNew && this.marker.setPosition(this.markerPosition)
        this.marker = null
      }
    }
  }
}
