/**
 * 地图的类型定义
 */
export interface MarkerOptions {
  id: string
  
  // 数组元素依次是经度、纬度
  position: number[]
  
  // icon图片的底部中心在坐标位置点上
  icon?: string
  message?: string
  
  // label的左上角在坐标位置点上
  label?: string
  title?: string
  group?: string
  
  // 供画Marker时使用
  _refreshed?: boolean
}