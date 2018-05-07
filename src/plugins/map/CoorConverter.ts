/**
 * 坐标转换的方法
 * 传入和返回的坐标都是如下对象：
 * {lat: 36, lng: 117}
 */

import * as Types from './Types'

function round (num: number, precision: number) {
  return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
}

/**
 * _coorStandard：目标GPS的坐标系，原本的坐标系为wgs84
 */
export default class CoorConverter {
  // Krasovsky 1940
  //
  // _a = 6378245.0, 1/f = 298.3
  // b = _a * (1 - f)
  // _ee = (_a^2 - b^2) / _a^2
  _a = 6378245.0
  _ee = 0.00669342162296594323

  _pi = Math.PI
  _xPi = Math.PI * 3000.0 / 180.0
  
  constructor (private _coorStandard: number) {
  }

  /**
   * 转换为目标体系（this._coorStandard）坐标，参数为数组
   */
  fromWGS84A (pos: number[]) {
    let p = this.fromWGS84({ lng: pos[0], lat: pos[1] })
    return [p.lng, p.lat]
  }

  /**
   * 从目标体系（this._coorStandard）坐标转换为原本坐标，参数为数组
   */
  toWGS84A (pos: number[]) {
    let p = this.toWGS84({ lng: pos[0], lat: pos[1] })
    return [p.lng, p.lat]
  }

  /**
   * 从目标体系（this._coorStandard）坐标转换为原本坐标，四舍五入
   */
  toWGS84R (pos) {
    let p = this.toWGS84(pos)
    return { lng: round(p.lng, 7), lat: round(p.lat, 7) }
  }

  /**
   * 转换为目标体系（this._coorStandard）坐标
   */
  fromWGS84 (pos) {
    switch (this._coorStandard) {
      case Types.COOR_GCJ02:
        return this.wgs84_gcj02(pos)
      case Types.COOR_BD09:
        return this.wgs84_bd09(pos)
      case Types.COOR_WGS84:
        return pos
    }
  }

  /**
   * 从目标体系（this._coorStandard）坐标转换为原本坐标
   */
  toWGS84 (pos) {
    switch (this._coorStandard) {
      case Types.COOR_GCJ02:
        return this.gcj02_wgs84(pos)
      case Types.COOR_BD09:
        return this.bd09_wgs84(pos)
      case Types.COOR_WGS84:
        return pos
    }
  }

  /**
   * World Geodetic System ==> Mars Geodetic System
   */
  wgs84_gcj02 (wpos) {
      
    let wgLng = wpos.lng
    let wgLat = wpos.lat
    
    if (this._outOfChina(wgLat, wgLng)) {
      return wpos
    }

    let dLat = this._transformLat(wgLng - 105.0, wgLat - 35.0)
    let dLng = this._transformLng(wgLng - 105.0, wgLat - 35.0)
    
    // 经过实际数据测试，用下面这两个偏移，转换结果跟从百度接口查出来的相比，偏差不到5e-7
    dLat += 0.74
    dLng += 0.50
    
    let radLat = wgLat / 180.0 * this._pi
    let magic = Math.sin(radLat)
    magic = 1 - this._ee * magic * magic
    let sqrtMagic = Math.sqrt(magic)
    dLat = (dLat * 180.0) / ((this._a * (1 - this._ee)) / (magic * sqrtMagic) * this._pi)
    dLng = (dLng * 180.0) / (this._a / sqrtMagic * Math.cos(radLat) * this._pi)
    
    return { lat: wgLat + dLat, lng: wgLng + dLng }
  }

  _outOfChina (lat, lng) {
    if (lng < 72.004 || lng > 137.8347) return true
    if (lat < 0.8293 || lat > 55.8271) return true
    return false
  }

  _transformLat (x, y) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
    ret += (20.0 * Math.sin(6.0 * x * this._pi) + 20.0 * Math.sin(2.0 * x * this._pi)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(y * this._pi) + 40.0 * Math.sin(y / 3.0 * this._pi)) * 2.0 / 3.0
    ret += (160.0 * Math.sin(y / 12.0 * this._pi) + 320 * Math.sin(y * this._pi / 30.0)) * 2.0 / 3.0
    return ret
  }

  _transformLng (x, y) {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
    ret += (20.0 * Math.sin(6.0 * x * this._pi) + 20.0 * Math.sin(2.0 * x * this._pi)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(x * this._pi) + 40.0 * Math.sin(x / 3.0 * this._pi)) * 2.0 / 3.0
    ret += (150.0 * Math.sin(x / 12.0 * this._pi) + 300.0 * Math.sin(x / 30.0 * this._pi)) * 2.0 / 3.0
    return ret
  }
      
  /**
   *  Mars Geodetic System ==> World Geodetic System
   *  把用wgs84_gcj02方法转换来的坐标再用此方法转换回去，偏差小于1e-7
   */
  gcj02_wgs84 (gpos) {
    let ggpos = this.wgs84_gcj02(gpos)
    let dLat = ggpos.lat - gpos.lat
    let dLng = ggpos.lng - gpos.lng
    let wpos1 = { lat: gpos.lat - dLat, lng: gpos.lng - dLng }
    let gpos1 = this.wgs84_gcj02(wpos1)
    let wpos2 = { lat: wpos1.lat - (gpos1.lat - gpos.lat), 
      lng: wpos1.lng - (gpos1.lng - gpos.lng) }
    return wpos2
  }
      
  /**
   * gcj02 => baidu 09
   */
  gcj02_bd09 (gpos) {
        
    let x = gpos.lng
    let y = gpos.lat  
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this. _xPi)  
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this. _xPi)  
    let bdLng = z * Math.cos(theta) + 0.0065  
    let bdLat = z * Math.sin(theta) + 0.006
    
    return { lat: bdLat, lng: bdLng }
  } 
      
  /**
   * baidu 09 => gcj02，本方法采用再次逼近后，跟用gcj02_bd09转换之前的坐标相比，偏差在3e-9左右
   */
  bd09_gcj02 (gpos) {
    let ggpos = this.gcj02_bd09(gpos)
    let dLat = ggpos.lat - gpos.lat
    let dLng = ggpos.lng - gpos.lng
    let wpos1 = { lat: gpos.lat - dLat, lng: gpos.lng - dLng }
    let gpos1 = this.gcj02_bd09(wpos1)
    let wpos2 = {lat: wpos1.lat - (gpos1.lat - gpos.lat), 
      lng: wpos1.lng - (gpos1.lng - gpos.lng)}
    let gpos2 = this.gcj02_bd09(wpos2)
    let wpos3 = {lat: wpos2.lat - (gpos2.lat - gpos.lat), 
      lng: wpos2.lng - (gpos2.lng - gpos.lng)}
    return wpos3
  }
      
  /**
   * wgs84 => baidu 09
   */
  wgs84_bd09 (wpos) {
    return this.gcj02_bd09(this.wgs84_gcj02(wpos))
  }
      
  /**
   * baidu 09 => wgs84
   */
  bd09_wgs84 (bpos) {
    return this.gcj02_wgs84(this.bd09_gcj02(bpos))
  }
}
