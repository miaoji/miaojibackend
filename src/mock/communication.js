const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

/*
 * @mock data
 * subject 主体;
 * noteCount 短信数, noteMoney 短信金额, voiceCount 语音数量, voiceMoney 语音通知金额, wxCount 微信通知数量,
 * callCount 直拨电话数量, callTime 直拨时长, callMoney 直拨电话金额, callbackCount 回拨次数,
 * callbackMoney 回拨金额, callbackTime 回拨时长, totalMoney 总金额
 */

let communicationData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      'subject|1': ['总部', '区', '店'],
      'noteCount|0-999': 1,
      'noteMoney|0-999': 1,
      'voiceCount|0-999': 1,
      'voiceMoney|0-999': 1,
      'wxCount|0-999': 1,
      'callCount|0-999': 1,
      'callTime|0-999': 1,
      'callMoney|0-999': 1,
      'callbackCount|0-999': 1,
      'callbackMoney|0-999': 1,
      'callbackTime|0-999': 1,
      'totalMoney|0-999': 1,
      createTime: '@datetime',
    },
  ],
})

let database = communicationData.data

/*
 * @type function
 * 从数组中查找 key value === 输入的key值的 数据
 */

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`GET ${apiPrefix}/communications`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
}
