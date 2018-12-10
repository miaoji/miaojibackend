import city from '../utils/city'

const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|19': [
    {
      'id|+1': 1001,
      'oname|1': ['机构1', '机构2', '机构3', '机构4', '机构5'],
      'stroe|1-20': 1,
      'ROLE_NAME|1': ['管理员', '市场', '门店', '超级管理员'],
      city: '@city',
      'DESCRIPTION|1': ['今天很累了', '今天不怎么想说话了'],
      createTime: new Date().getTime(),
    },
  ],
})


let database = usersListData.data

module.exports = {

  [`POST ${apiPrefix}/quandiExpressSiteManager/organizeList`](req, res) {
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

  [`POST ${apiPrefix}/quandiExpressSiteManager/organizeDel`](req, res) {
    const ids = req.body
    database = database.filter(item => !ids.some(_ => Number(_) === Number(item.id)))
    res.status(200).json({
      code: 200,
      msg: '删除成功',
    })
  },

  [`POST ${apiPrefix}/quandiExpressSiteManager/organizeEdit`](req, res) {
    const { ID, id, description, menus, roleName, roleLocation } = req.body
    database = database.map((item) => {
      if (item.ID === ID || item.ID === id) {
        return {
          ID: ID || id,
          ROLE_NAME: roleName || item.ROLE_NAME,
          MENU_ID: menus || item.MENU_ID,
          DESCRIPTION: description || item.DESCRIPTION,
          ROLE_LOCATION: JSON.stringify(roleLocation),
          ROLE_CREATE_TIME: new Date().getTime(),
        }
      }
      return item
    })
    res.status(200).json({
      code: 200,
      msg: '修改成功',
    })
  },

  [`GET ${apiPrefix}/quandiExpressSiteManager/getLocation`](_, res) {
    res.status(200).json({
      code: 200,
      obj: city,
      msg: '查询成功',
    })
  },

  [`POST ${apiPrefix}/menuList`](_, res) {
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

  [`POST ${apiPrefix}/quandiExpressSiteManager/organizeAdd`](req, res) {
    const { description, menus, roleName, roleLocation } = req.body
    database.unshift({
      ID: 1001 + database.length,
      ROLE_NAME: roleName,
      MENU_ID: menus,
      DESCRIPTION: description,
      ROLE_CREATE_TIME: new Date().getTime(),
      ROLE_LOCATION: JSON.stringify(roleLocation),
    })
    res.status(200).json(
      {
        code: 200,
        mess: '添加成功',
      }
    )
  },

}
