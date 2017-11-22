const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

/*
 * @mock data
 * subject 主体;
 * income 收入: deliveryCharges 派送费, SendCharges 寄件费, collectCharges 到付, collection 代收, others 其他;
 * expend 支出: communicateCharges 通讯费, withdrawCharges 提现费用, others 其他;
 * balance 余额
 */

let checkbookData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      'subject|1': ['总部', '区', '店'],
      income: {
        'deliveryCharges|0-999': 1,
        'SendCharges|0-999': 1,
        'collectCharges|0-999': 1,
        'collection|0-999': 1,
        'others|0-999': 1,
      },
      expend: {
        'communicateCharges|0-999': 1,
        'withdrawCharges|0-999': 1,
        'others|0-999': 1,
      },
      'balance|0-999': 1,
      createTime: '@datetime',
    },
  ],
})

let database = checkbookData.data

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`GET ${apiPrefix}/checkbooks`] (req, res) {
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
