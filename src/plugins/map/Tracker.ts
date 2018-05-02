/**
 * 轨迹回放器
 */
import GMap from './GMap'
import * as Types from './Types'

let win: any = window
let AMapUI: any = win.AMapUI
let map: any

export default class Tracker {
  pathSimplifierIns: any
  navigator: any
  // 轨迹线的样式，默认不显示
  lineStyle: any
  // 走过的轨迹线的样式
  passedLineStyle: any
  // 回放器的样式
  navigatorStyle: any
  // 加载了数据后是否自动进行回放，默认自动回放
  autoStart: boolean = true
  
  constructor (options: any, private amap: any) {
    if (options.lineStyle) this.lineStyle = options.lineStyle
    if (options.passedLineStyle) this.passedLineStyle = options.passedLineStyle
    if (options.navigatorStyle) this.navigatorStyle = options.navigatorStyle
    if (options.autoStart === false) this.autoStart = false
    
    let _this = this
    
    AMapUI.load('ui/misc/PathSimplifier', PathSimplifier => {
      if (!PathSimplifier.supportCanvas) {
        alert('当前环境不支持 Canvas！')
        return
      }

      _this.pathSimplifierIns = new PathSimplifier({
        zIndex: 100,
        map: amap, 

        getPath: function (pathData: Types.TrackPath, pathIndex: number) {
          let path: number[][] = []
          for (let i in pathData.path) {
            path.push(pathData.path[i].position)
          }
          return path
        },
        
        getHoverTitle: function (pathData: Types.TrackPath, pathIndex: number, pointIndex: number) {
          if (pointIndex >= 0) {
            let pointData = pathData.path[pointIndex]
            let msg = '时间:' + pointData.time + '，速度:' + pointData.speed
            if (pointData.message) msg += '<br/>' + pointData.message
            return msg
          } else {
            return pathData.name
          }
        },
        
        renderOptions: {
          renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
        }
      })

      if (options._trackData) {
        _this.playback(options._trackData)
      }
    })
  }
  
  playback (data: Types.TrackData) {
    // 设置数据
    this.pathSimplifierIns.setData(data.paths)

    // 对第一条线路（即索引 0）创建一个巡航器
    let navg1 = this.pathSimplifierIns.createPathNavigator(0, this.navigatorStyle)

    this.autoStart && navg1.start()
  }
}
