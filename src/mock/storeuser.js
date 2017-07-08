const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

/*
 * @mock data
 * accounts 帐号/手机号, name 经营人姓名, storename 店铺名称, level 店铺级别(0 = 门店主帐号/ 1 = 门店子帐号)
 * status 状态( 1 =启用/ 0 = 禁用), createTime 注册时间, blacklist 黑名单 (0 是黑名单 1 不是)
 * detail 详情：info 用户列表中信息, address 地址(省、市、区),
 *              superior 所属上级, officehours 营业时间, consultPhone 咨询电话, 
 *              applicantIDCardNum 申请人身份证号, businessLicenseImg 营业执照照片, 
 *              doorImg 门头照片, serviceBarImg 服务台照片, shelfImg 货架照片
 */

let storeUsersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      accounts: /^1[34578]\d{9}$/,
      name: '@cname',
      storename: '@cname',
      'level|0-1': 1,
      status: '@boolean',
      createTime: '@datetime',
      'blacklist|0-1': 1,
      detail: {
        info: '@csentence(3, 10)',
        address: '@county(true)',
        superior: '@cname',
        officehours: '@datetime',
        consultPhone: /^1[34578]\d{9}$/,
        applicantIDCardNum: /^320351[34578]\d{9}$/,
        businessLicenseImg () {
          return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', '证')
        },
        doorImg () {
          return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', '门')
        },
        serviceBarImg () {
          return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', '服')
        },
        shelfImg () {
          return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', '货')
        },
      },
    },
  ],
})

let database = storeUsersListData.data

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

  [`GET ${apiPrefix}/storeusers`] (req, res) {
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

  [`POST ${apiPrefix}/storeuser`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/storeuser/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/storeuser/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter((item) => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${apiPrefix}/storeuser/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
