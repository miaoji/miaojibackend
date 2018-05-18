const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

/*
 * @mock data 充值记录
 * serialNum 流水号, money 金额, time 时间, payPerson 充值人, status 充值状态
 */

let topupData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      serialNum: /^5[34578]\d{9}$/,
      'money|0-9999': 1,
      time: '@datetime',
      payPerson: '@cname',
      'status|0-1': 1,
    },
  ],
})

let database = topupData.data

module.exports = {

  [`GET ${apiPrefix}/topups`] (req, res) {
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
            } else if (key === 'time') {
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
