import { request, config } from '../utils'
import { getOrgIdUsers } from '../utils/getUserInfo'

const { api } = config
const { dashboard } = api

/**
 * [获取首页折线图数据]
 */
export async function getLineData(params = {}) {
  params.userIds = getOrgIdUsers() || ''
  return request({
    url: dashboard.echart,
    method: 'post',
    params,
  })
}
/**
 * [获取微信用户数量]
 */
export async function weChatUser(params = {}) {
  params.userIds = getOrgIdUsers()
  return request({
    url: dashboard.weChatUser,
    method: 'post',
    data: params,
  })
}

export async function storeTotal() {
  return request({
    url: dashboard.storeTotal,
    method: 'post',
  })
}
/**
 * [获取昨日收入]
 */
export async function income(params = {}) {
  params.userIds = getOrgIdUsers()
  return request({
    url: dashboard.income,
    method: 'post',
    data: params,
  })
}

/**
 * [获取设备总数]
 */
export async function terminalTotal(params = {}) {
  params.userIds = getOrgIdUsers()
  return request({
    url: dashboard.terminalTotal,
    method: 'post',
    data: params,
  })
}
/**
 * [获取业务量数据]
 */
export function businessvolumecount(params = {}) {
  params.userIds = getOrgIdUsers()
  return request({
    url: dashboard.businessvolumecount,
    method: 'post',
    data: params,
  })
}
/**
 * [获取业务量注册数据]
 */
export function businessRegist(params = {}) {
  return request({
    url: dashboard.businessRegist,
    method: 'post',
    data: params,
  })
}
/**
 * [获取业务量操作数据]
 */
export function businessOperation(params = {}) {
  return request({
    url: dashboard.businessOperation,
    method: 'post',
    data: params,
  })
}
