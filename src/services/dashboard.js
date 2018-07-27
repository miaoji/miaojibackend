import { request, config, getOrgId } from '../utils'

const { api } = config
const { dashboard } = api

/**
 * [获取首页折线图数据]
 */
export async function getLineData(params = {}) {
  params.orgId = getOrgId()
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
  params.orgId = getOrgId()
  return request({
    url: dashboard.weChatUser,
    method: 'post',
    params,
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
  params.orgId = getOrgId()
  return request({
    url: dashboard.income,
    method: 'post',
    params,
  })
}

/**
 * [获取设备总数]
 */
export async function terminalTotal(params = {}) {
  params.orgId = getOrgId()
  return request({
    url: dashboard.terminalTotal,
    method: 'post',
    params,
  })
}
