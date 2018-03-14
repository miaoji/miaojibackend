// 传入一个时间戳,转换成常见的时间格式

export const formatTime = function (val) {
  if (val == null || val === '' || val.length !== 13) {
    return '未知时间'
  }
  let date = new Date(parseInt(val, 10))
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m > 9 ? m : `0${m}`
  let d = date.getDate()
  d = d > 9 ? d : `0${d}`
  let h = date.getHours()
  h = h > 9 ? h : `0${h}`
  let mm = date.getMinutes()
  mm = mm > 9 ? mm : `0${mm}`
  let s = date.getSeconds()
  s = s > 9 ? s : `0${s}`
  return (`${y}/${m}/${d} ${h}:${mm}:${s}`)
}


// 弥补创建时间控件获取的时间戳是带当前时间的问题

// @val  [type:number] 13的时间戳
// @type [type:string] 要转换的时间是开始时间还是结束时间

export const repairTime = function (val) {
  if (val[0] !== null && val[1] !== null) {
    const date = new Date(val[0]._d)
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    const ms = date.getMilliseconds()

    const times = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000) + ms

    const startTime = new Date(val[0]._d).getTime() - times
    const endTime = new Date(val[1]._d).getTime() - times + 86400000 - 1
    return {
      startTime,
      endTime,
    }
  }
  const startTime = undefined
  const endTime = undefined
  return {
    startTime,
    endTime,
  }
}

export function yesterTime() {
  const date = new Date()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const ms = date.getMilliseconds()
  const times = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000) + ms
  const startTime = date.getTime() - times
  const endTime = date.getTime() - times + 86400000 - 1
  return {
    startTime,
    endTime
  }
}

// val 时间戳
export function getToday (val) {
  let date = new Date(val)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m > 9 ? m : `0${m}`
  let d = date.getDate()
  d = d > 9 ? d : `0${d}`
  return (`${y}-${m}-${d}`)
}

export function getLineTime (){
  var date = []

  for (var i = 0; i < 30; i++) {
    date.unshift(getToday((new Date().getTime()-(86400000*(i+1)))))
  }
  return date
}