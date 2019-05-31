/* 京东单号管理 */
import { request, config } from '../../utils'

const { api } = config
const { jd } = api

// 查询单号池剩余单号
export async function findOrderSheetCount(params) {
  return request({
    url: jd.findOrderSheetCount,
    method: 'post',
    params,
  })
}

// 批量填充单号池
export async function orderSheet(params) {
  return request({
    url: jd.orderSheet,
    method: 'post',
    params,
  })
}

// 设置京东分成比例
export async function setJDConfig(params) {
  return request({
    url: jd.setJDConfig,
    method: 'post',
    params,
  })
}

// 获取京东分成比例
export async function getJDConfig() {
  return request({
    url: jd.getJDConfig,
    method: 'post',
    params: { param: '' },
  })
}
