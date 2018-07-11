const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      'idUser|+1': 1001,
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      mobile: /^1[3-9][0-9]{9}$/,
      'sex|0-2': 1,
      note: '@city',
      'remark|1': ['今天很累了', '今天不怎么想说话了'],
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: new Date().getTime(),
    },
  ],
})


let database = usersListData.data

module.exports = {

  [`GET ${apiPrefix}/adminuser`](req, res) {
    const { query } = req
    let { rownum, pagination, ...other } = query
    rownum = rownum || 10
    pagination = pagination || 1

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
      obj: newData.slice((pagination - 1) * rownum, pagination * rownum),
      total: newData.length,
    })
  },

  [`DELETE ${apiPrefix}/adminuser`](req, res) {
    const { id } = req.body
    // database = database.filter((item) => { return !id.some(_ => _ === item.id) })
    res.status(200).json({
      code: 200,
      id,
      msg: '删除成功',
    })
  },
}
