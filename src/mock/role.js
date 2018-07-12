const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|19': [
    {
      'ID|+1': 1001,
      name: '@name',
      'ROLE_NAME|1': ['管理员', '市场', '门店', '超级管理员'],
      'idUser|+1': 1001,
      MENU_ID: ['0-0-0', '0-0-1'],
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      mobile: /^1[3-9][0-9]{9}$/,
      'sex|0-2': 1,
      note: '@city',
      'DESCRIPTION|1': ['今天很累了', '今天不怎么想说话了'],
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: new Date().getTime(),
      ROLE_CREATE_TIME: new Date().getTime(),
    },
  ],
})


let database = usersListData.data

module.exports = {

  [`POST ${apiPrefix}/roleList`](req, res) {
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

  [`POST ${apiPrefix}/roleDel`](req, res) {
    const ids = req.body
    database = database.filter(item => !ids.some(_ => Number(_) === Number(item.ID)))
    res.status(200).json({
      code: 200,
      msg: '删除成功',
    })
  },

  [`POST ${apiPrefix}/roleUpdate`](req, res) {
    const { id } = req.query
    database = database.filter(item => !(Number(id) === Number(item.id)))
    res.status(200).json({
      code: 200,
      msg: '删除成功',
    })
  },

  [`POST ${apiPrefix}/menuList`](req, res) {
    res.status(200).json({
      code: 200,
      obj: [
        {
          menuName: '0-0',
          id: '0-0',
          children: [{
            menuName: '0-0-0',
            id: '0-0-0',
            children: [
              { menuName: '0-0-0-0', id: '0-0-0-0' },
              { menuName: '0-0-0-1', id: '0-0-0-1' },
              { menuName: '0-0-0-2', id: '0-0-0-2' },
            ],
          }, {
            menuName: '0-0-1',
            id: '0-0-1',
            children: [
              { menuName: '0-0-1-0', id: '0-0-1-0' },
              { menuName: '0-0-1-1', id: '0-0-1-1' },
              { menuName: '0-0-1-2', id: '0-0-1-2' },
            ],
          }, {
            menuName: '0-0-2',
            id: '0-0-2',
          }],
        }, {
          menuName: '0-1',
          id: '0-1',
          children: [
            { menuName: '0-1-0-0', id: '0-1-0-0' },
            { menuName: '0-1-0-1', id: '0-1-0-1' },
            { menuName: '0-1-0-2', id: '0-1-0-2' },
          ],
        }, {
          menuName: '0-2',
          id: '0-2',
        },
      ],
      msg: '查询成功',
    })
  },

  [`POST ${apiPrefix}/roleAdd`](req, res) {
    const { remark, roleName } = req.query
    res.status(200).json(
      {
        code: 200,
        msg: '添加成功',
        obj: [{
          remark,
          roleName,
        }],
      }
    )
    // const { id } = req.query
    // database = database.filter(item => !(Number(id) === Number(item.id)))
    // res.status(200).json({
    //   code: 200,
    //   msg: '删除成功',
    // })
  },

}
