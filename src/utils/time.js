//传入一个时间戳,转换成常见的时间格式

export const formatTime = function (val) {
  if (val == null || val == '' || val.length!=13) {
        return '未知时间'
  } else {
    let date = new Date(parseInt(val))
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    let h = date.getHours()
    let mm = date.getMinutes()
    let s = date.getSeconds()
    return (y+"/"+m+"/"+d+" "+h+":"+mm+":"+s)
  }
}
