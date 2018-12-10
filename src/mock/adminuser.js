const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|8': [
    {
      'ID|+1': 1001,
      name: '@cname',
      number: /^1[34578]\d{9}$/,
      'role|1': ['admin', 'user1', 'user2'],
      'store|1': ['张江小店', '家门口小店', '闵行小店', '高行小店', '徐汇小店'],
      'idUser|+1': 1001,
      mobile: /^1[34578]\d{9}$/,
      note: '@city',
      'remark|1': ['今天很累了', '今天不怎么想说话了'],
      createTime: new Date().getTime(),
    },
  ],
})


let database = usersListData.data

module.exports = {

  [`POST ${apiPrefix}/operatorList`](req, res) {
    const { body } = req
    let { rownum, pagination, ...other } = body
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
      code: 200,
      obj: newData.slice((pagination - 1) * rownum, pagination * rownum),
      total: newData.length,
    })
  },

  [`POST ${apiPrefix}/operatorDel`](req, res) {
    const ids = req.body
    database = database.filter(item => !ids.some(_ => Number(_) === Number(item.ID)))
    res.status(200).json({
      code: 200,
      msg: '删除成功',
    })
  },

  [`POST ${apiPrefix}/operatorEdit`](req, res) {
    const {
      idUser,
      store,
      mobile,
      name,
      number,
      remark,
      role,
      ID,
    } = req.body
    database = database.map((item) => {
      if (item.ID === ID) {
        return {
          ID,
          name,
          number,
          role,
          store,
          idUser,
          mobile,
          remark,
          createTime: new Date().getTime(),
        }
      }
      return item
    })
    res.status(200).json({
      code: 200,
      msg: '修改成功',
    })
  },

  [`POST ${apiPrefix}/operatorAdd`](req, res) {
    const {
      idUser,
      store,
      mobile,
      name,
      number,
      password,
      remark,
      role,
    } = req.body

    database.unshift({
      ID: 1001 + database.length,
      name,
      number,
      role,
      store,
      idUser,
      mobile,
      note: '上海',
      remark,
      password,
      createTime: new Date().getTime(),
    })
    res.status(200).json(
      {
        code: 200,
        mess: '添加成功',
      }
    )
  },

}
