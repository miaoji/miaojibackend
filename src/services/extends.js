import { config } from '../utils'
import request from '../utils/request'

const { api } = config
const { order } = api

/**
 * [查询]
 */
export function list(params) {
  return request({
    url: order.list,
    method: 'post',
    data: params,
  })
}
/**
 * [新增]
 */
export function add(params) {
  return request({
    url: order.list,
    method: 'post',
    data: params,
  })
}
/**
 * [修改]
 */
export function mod(params) {
  return request({
    url: order.list,
    method: 'post',
    data: params,
  })
}
/**
 * [删除]
 */
export function del(params) {
  return request({
    url: order.list,
    method: 'post',
    data: params,
  })
}
