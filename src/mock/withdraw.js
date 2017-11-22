const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

/*
 * @mock data 提现记录
 * withdrawPerson 提现人, money 提现金额, accountType 帐号类型, account 帐号
 * time 提现时间, status 提现状态
 */

let withdrawData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      withdrawPerson: '@cname',
      'money|0-9999': 1,
      'accountType|0-1': 1,
      account: /^6[34578]\d{9}$/,
      time: '@datetime',
      'status|0-1': 1,
    },
  ],
})

let database = withdrawData.data

module.exports = {

  [`GET ${apiPrefix}/withdraws`] (req, res) {
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
