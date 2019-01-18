import { config, pageParams } from '../utils'
import request from '../utils/request'

const { api } = config
const { bankcard } = api

/**
 * [查询]
 */
export function list(params) {
  params = pageParams(params)
  // if (!params.userIds && !params.superId) {
  //   // params.superId = -1
  // }
  return request({
    url: bankcard.list,
    method: 'post',
    params: {
      param: JSON.stringify(params),
    },
  })
}
/**
 * [新增]
 */
export function add(params) {
  return request({
    url: bankcard.create,
    method: 'post',
    params: {
      param: JSON.stringify(params),
    },
  })
}
/**
 * [修改]
 */
export function mod(params) {
  return request({
    url: bankcard.update,
    method: 'post',
    params: {
      param: JSON.stringify(params),
    },
  })
}
/**
 * [删除]
 */
export function del(params) {
  return request({
    url: bankcard.delete,
    method: 'post',
    params: {
      param: JSON.stringify(params),
    },
  })
}
