/**
 * 地图的类型定义
 */
export interface MarkerOptions {
  // 最好要有id，且id不能重复
  id?: string
  
  // 数组元素依次是经度、纬度
  position: number[]
  
  // icon图片的底部中心在坐标位置点上
  icon?: string
  
  // 点击Marker之后弹出的信息
  message?: string
  
  // label的左上角在坐标位置点上
  label?: string
  
  // 鼠标移动到Marker上时浮动显示的信息
  title?: string
  
  // 所属分组，同一个组内的覆盖物可以同时显示或隐藏
  group?: string
  
  // 供画Marker时使用
  _refreshed?: boolean
}

export interface PolylineOptions {
  // 最好要有id，且id不能重复
  id?: string
  
  // 每个数组元素是一对经纬度
  path: number[][]
  
  // 线条颜色
  strokeColor: string
  
  // 线条宽度
  strokeWeight: number
  
  // 线条透明度
  strokeOpacity?: number
  
  // 线条风格，实线:solid，虚线:dashed
  strokeStyle?: string
  
  // 是否延路径显示白色方向箭头,默认false。Canvas绘制时有效，建议折线宽度大于6时使用
  showDir?: boolean
  
  // 鼠标悬停时的鼠标样式
  cursor?: string
  
  // 折线覆盖物的叠加顺序
  zIndex?: string
  
  // 描边的宽度，默认为1。描边的宽度与颜色有一项赋值时，就会有描边
  borderWeight?:	number
  
  // 线条描边颜色，默认：#000000
  outlineColor?: string

  // 线条是否带描边，默认false。一般不需要设置
  isOutline?: boolean
  
  // 点击Marker之后弹出的信息
  message?: string
  
  // 所属分组，同一个组内的覆盖物可以同时显示或隐藏
  group?: string
}