import lodash from 'lodash'
import { getOrgId } from './getUserInfo'
/**
 * 对网络请求的params做处理，针对分页
 * @param   {Object} params 传入一个需要的对象
 * @return  {Object} 返回一个处理好的对象
 */
export const pageParams = function (params) {
  params = { ...params } || {
    pagination: 1,
    rownum: 10,
  }
  params.orgId = getOrgId()
  params.pagination = params.page ? Number(params.page) : 1
  params.rownum = params.pageSize ? Number(params.pageSize) : 10
  delete params.page
  delete params.pageSize
  return params
}


/**
 * @param   {String}
 * @return  {String}
 */

export const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
export const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}
/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
