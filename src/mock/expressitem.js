const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

/*
 * @mock data
 * subject 主体;
 * normal 普通件: storesNum 上架数, signNum 签收数, backNum 退回数, errNum 问题件数;
 * collect 到付: collectNum 到付件数,  storesNum 上架数, signNum 签收数, backNum 退回数, errNum 问题件数;
 * collection 代收: storesNum 上架数, signNum 签收数, backNum 退回数, errNum 问题件数;
 */

let expressitemData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      'subject|1': ['总部', '区', '店'],
      normal: {
        'storesNum|0-999': 1,
        'signNum|0-999': 1,
        'backNum|0-999': 1,
        'errNum|0-999': 1,
      },
      collect: {
        'collectNum|0-999': 1,
        'storesNum|0-999': 1,
        'signNum|0-999': 1,
        'backNum|0-999': 1,
        'errNum|0-999': 1,
      },
      collection: {
        'storesNum|0-999': 1,
        'signNum|0-999': 1,
        'backNum|0-999': 1,
        'errNum|0-999': 1,
      },
      createTime: '@datetime',
    },
  ],
})

let database = expressitemData.data

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`GET ${apiPrefix}/expressitems`] (req, res) {
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
