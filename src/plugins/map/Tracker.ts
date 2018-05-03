/**
 * 轨迹回放器
 */
import GMap from './GMap'
import * as Types from './Types'

let win: any = window
let AMapUI: any = win.AMapUI
let map: any

let emptyLineStyle = {
  lineWidth: 0,
  fillStyle: null,
  strokeStyle: null,
  borderStyle: null
}

function copy (from, to) {
  if (from && typeof to !== 'undefined' && to !== null) {
    for (let k in from) {
      to[k] = from[k]
    }
  }
}
        
export default class Tracker {
  pathSimplifierIns: any
  navigators: any[] = []

  // 轨迹线的数量
  lineNumber: number
  
  // 轨迹线的样式，默认不显示
  lineStyle: any = {}
  
  // 走过的轨迹线的样式
  passedLineStyle: any = {}
  
  // 回放器的样式
  navigatorStyle: any = {}
  
  // 加载了数据后是否自动进行回放，默认自动回放
  autoStart: boolean = true
  
  // 循环播放
  loop: boolean = false
  
  // 巡航速度，单位千米/小时
  speed: number = 1000
  
  constructor (options: any, private amap: any) {
    copy(options.lineStyle, this.lineStyle)
    copy(options.passedLineStyle, this.passedLineStyle)
    copy(options.navigatorStyle, this.navigatorStyle)
    this.navigatorStyle.pathLinePassedStyle = this.passedLineStyle
    this.autoStart = !(options.autoStart === false)
    this.loop = (options.loop === true)
    if (options.speed > 0) this.speed = options.speed
    
    let _this = this
    
    AMapUI.load('ui/misc/PathSimplifier', PathSimplifier => {
      if (!PathSimplifier.supportCanvas) {
        alert('当前环境不支持 Canvas！')
        return
      }
    
      if (_this.navigatorStyle.icon) {
        _this.navigatorStyle.content = PathSimplifier.Render.Canvas.getImageContent(_this.navigatorStyle.icon)
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
          } 
          
          return pathData.name
        },
        
        renderOptions: {
          pathLineStyle: _this.lineStyle,
          pathLineHoverStyle: emptyLineStyle,
          renderAllPointsIfNumberBelow: 100, // 绘制路线节点，如不需要可设置为-1
          pathNavigatorStyle: _this.navigatorStyle,

          // 每条轨迹线可能会有自己的样式
          getPathStyle: function (pathItem, zoom) {
            return {
              pathLineStyle: pathItem.pathData.lineStyle ? pathItem.pathData.lineStyle : {}, 
              pathNavigatorStyle: {
                pathLinePassedStyle: pathItem.pathData.passedLineStyle ? pathItem.pathData.passedLineStyle : {}
              }
            }
          }
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
    this.lineNumber = data.paths.length

    // 对每一条线路创建一个巡航器
    this.navigators[0] = this.pathSimplifierIns.createPathNavigator(0, {
      loop: this.loop, speed: this.speed
    })
    this.startNextNavi(0)

    this.autoStart && this.navigators[0].start()
  }

  startNextNavi (curIndex: number) {
    if (curIndex === this.lineNumber - 1) return

    this.navigators[curIndex].on('pause', event => {
      console.log('navi pause: ' + curIndex + ' ' + event.type)
      this.navigators[curIndex + 1] = this.pathSimplifierIns.createPathNavigator(curIndex + 1, {
        loop: this.loop, speed: this.speed
      })
      this.navigators[curIndex].setOption('pathNavigatorStyle', { width: 0, height: 0 })
      this.startNextNavi(curIndex + 1)
      this.navigators[curIndex + 1].start()
    })
  }
}
