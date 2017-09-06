//传入一个时间戳,转换成常见的时间格式

export const formatTime = function (val) {
  if (val == null || val == '' || val.length!=13) {
        return '未知时间'
  } else {
    let date = new Date(parseInt(val))
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m > 10 ? m : "0" + m
    let d = date.getDate()
    d = d > 10 ? d : "0" + d
    let h = date.getHours()
    h = h > 10 ? h : "0" + h 
    let mm = date.getMinutes()
    mm = mm > 10 ? mm : "0" + mm
    let s = date.getSeconds()
    s = s > 10 ? s : "0" + s 
    return (y+"/"+m+"/"+d+" "+h+":"+mm+":"+s)
  }
}
