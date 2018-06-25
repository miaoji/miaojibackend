import moment from 'moment'

export function initialCreateTime(payload) {
  payload = { ...payload }
  console.log('payload123123', payload)
  const { createTime } = payload
  if (createTime && createTime.length && createTime[0] && createTime[1]) {
    let tmpTime = []
    /* eslint valid-typeof: 'off' */
    console.log(typeof (createTime[0]))
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
    payload.startTime = `${tmpTime[0]}000`
    payload.endTime = `${tmpTime[1]}999`
    delete payload.createTime
  } else {
    delete payload.createTime
  }
  return payload
}

export function yesterTime() {
  let dayCount = 1
  const test = false
  if (process.env.NODE_ENV !== 'development' || test) {
    dayCount = 1
    // if (window.location.search === '') {
    //   message.info(`默认查询截至昨天晚上12点, ${dayCount} 天内的数据`)
    // }
    const date = new Date()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    const ms = date.getMilliseconds()
    const times = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000) + ms
    const startTime = date.getTime() - 86400000 * dayCount - times
    const endTime = date.getTime() - times - 1
    return {
      startTime,
      endTime,
    }
  }
  return {
    startTime: 1528992000000,
    endTime: 1529078399999,
  }
}

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


export function handleFields(fields) {
  const { createTime } = fields
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

export function defaultTime(filters) {
  filters = { ...filters }
  const times = yesterTime()
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

export function getToday(val) {
  let date = new Date(val)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m > 9 ? m : `0${m}`
  let d = date.getDate()
  d = d > 9 ? d : `0${d}`
  return (`${y}-${m}-${d}`)
}

export function getLineTime() {
  let date = []

  for (let i = 0; i < 30; i++) {
    date.unshift(getToday((new Date().getTime() - (86400000 * (i + 1)))))
  }
  return date
}
