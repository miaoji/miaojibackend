// eslint-disable-next-line no-extend-native
Date.prototype.format = function () {
  const YY = this.getFullYear()
  const MM = this.getMonth() + 1
  const DD = this.getDate()
  const HH = this.getHours()
  const mm = this.getMinutes()
  const ss = this.getSeconds()
  return `${YY}-${MM > 9 ? MM : `0${MM}`}-${DD > 9 ? DD : `0${DD}`} ${HH > 9 ? HH : `0${HH}`}:${mm > 9 ? mm : `0${mm}`}:${ss > 9 ? ss : `0${ss}`}`
}

// eslint-disable-next-line no-extend-native
Date.prototype.getTodayStartTime = function () {
  const nowTime = this.getTime()
  const oneDayTime = nowTime % 86400000 + (8 * 3600000)
  return nowTime - oneDayTime
}

// eslint-disable-next-line no-extend-native
Date.prototype.getTodayEndTime = function () {
  const nowTime = this.getTime()
  const oneDayTime = nowTime % 86400000 + (8 * 3600000)
  return nowTime - oneDayTime + 86400000 - 1
}

// eslint-disable-next-line no-extend-native
Date.prototype.getYesterdayTimes = function (type = 'number') {
  const startTime = this.getTodayStartTime() - 86400000
  const endTime = this.getTodayEndTime() - 86400000
  if (type === 'string') {
    return [new Date(startTime).format(), new Date(endTime).format()]
  }
  return [startTime, endTime]
}
