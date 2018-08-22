import moment from 'moment'
/**
 * [按照传入的参数生成一个时间粗数组]
 * @param {number} frontDay [从多少天以前开始,0代表昨天一天]
 * @param {number} distance [间隔的天数,结束时间=提前的天数-时间间隔]
 * @return {array}          [一个包含两个时间戳的数组]
 */
export function yesterTime(frontDay = 1, distance = 0, isInit = false) {
  const newfrontDay = frontDay - 1
  let dayCount = 1
  const test = true
  if (process.env.NODE_ENV !== 'development' || test) {
    dayCount = 1
    const date = new Date()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    const ms = date.getMilliseconds()
    const times = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000) + ms
    const startTime = date.getTime() - 86400000 * dayCount - times - 86400000 * newfrontDay
    let endTime
    if (isInit) {
      endTime = date.getTime() - times - 86400000 - 86400000 * (newfrontDay - distance)
    } else {
      endTime = date.getTime() - times - 1 - 86400000 * (newfrontDay - distance)
    }
    return {
      startTime,
      endTime,
    }
  }
  if (isInit) {
    return {
      startTime: 1531584000000 - 86400000 * newfrontDay,
      endTime: 1531584000000 - 86400000 * (newfrontDay - distance),
    }
  }
  return {
    startTime: 1531584000000 - 86400000 * newfrontDay,
    endTime: 1531670399999 - 86400000 * (newfrontDay - distance),
  }
}
/**
 * [将时间选择器选择得到的时间字符串转换成时间戳]
 * @param {object} payload [需要过滤的对象]
 * @param {boolean} isInit [是否对没有传入时间的对象经行初始化]
 * @return {object}        [过滤后的对象]
 */
export function initialCreateTime(payload, isInit = false) {
  payload = { ...payload }
  const { createTime } = payload
  if (createTime && createTime.length && createTime[0] && createTime[1]) {
    let tmpTime = []
    if (typeof (createTime[0]) === 'object') {
      createTime[0] = createTime[0].format('YYYY-MM-DD')
      createTime[1] = createTime[1].format('YYYY-MM-DD')
    }
    if (createTime[0]) {
      tmpTime[0] = moment(`${createTime[0]} 00:00:00`).unix()
    }
    if (createTime[1]) {
      tmpTime[1] = moment(`${createTime[1]} 23:59:59`).unix()
    }
    payload.startTime = `${tmpTime[0]}000` / 1
    payload.endTime = `${tmpTime[1]}999` / 1
    delete payload.createTime
  } else {
    delete payload.createTime
  }
  if (!payload.startTime && isInit) {
    const times = yesterTime()
    payload = { ...times, ...payload }
  } else {
    payload = { ...payload }
  }
  return payload
}


/**
 * [将时间数组格式话]
 */
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

/**
 * [过滤filter组件提交的数据]
 */
export function handleFields(fields) {
  const { createTime, location } = fields
  for (let item in fields) {
    if (typeof fields[item] === 'string') {
      fields[item] = fields[item].trim()
    }
  }
  if (location instanceof Array) {
    fields.location = fields.location.toString()
  }
  if (createTime && createTime[0] === null) {
    fields.createTime = undefined
  }
  if (createTime && createTime.length && createTime[0] && createTime[1]) {
    fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
  } else {
    fields.createTime = undefined
  }
  return fields
}

/**
 * [对时间选择器的初始化时间进行处理]
 * @param {Object} filters  [要过滤的对象]
 * @param {Number} frontDay [提前的时间]
 * @param {Number} distance [时间间隔]
 * @return {Object}            [加上初始化时间的过滤对象]
 */
export function defaultTime(filters, frontDay = 1, distance = 0) {
  filters = { ...filters }
  const times = yesterTime(frontDay, distance, true)
  if (!filters.createTime) {
    filters.createTime = []
    filters.createTime[0] = moment(times.startTime)
    filters.createTime[1] = moment(times.endTime)
  } else {
    filters.createTime[0] = moment(filters.createTime[0])
    filters.createTime[1] = moment(filters.createTime[1])
  }
  return filters
}

/**
 * 将时间戳转为年月日时间
 * @param {number} val 时间戳
 */
export function getToday(val) {
  let date = new Date(val)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m > 9 ? m : `0${m}`
  let d = date.getDate()
  d = d > 9 ? d : `0${d}`
  return (`${y}-${m}-${d}`)
}

/**
 * 获取从昨天起,到往前推30天的一个时间数组
 */
export function getLineTime() {
  let date = []

  for (let i = 0; i < 30; i++) {
    date.unshift(getToday((new Date().getTime() - (86400000 * (i + 1)))))
  }
  return date
}
