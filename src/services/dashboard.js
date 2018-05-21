import { request, config } from '../utils'

const { api } = config
const { dashboard } = api

export async function myCity (params) {
  return request({
    url: 'http://www.zuimeitianqi.com/zuimei/myCity',
    data: params,
  })
}

export async function queryWeather (params) {
  return request({
    url: 'http://www.zuimeitianqi.com/zuimei/queryWeather',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: dashboard.all,
    method: 'get',
    data: params,
  })
}

export async function getLineData() {
  return request({
    url: dashboard.echart,
    method: 'post',
  })
}

export async function weChatUser() {
  return request({
    url: dashboard.weChatUser,
    method: 'post',
  })
}

export async function storeTotal() {
  return request({
    url: dashboard.storeTotal,
    method: 'post',
  })
}

export async function income() {
  return request({
    url: dashboard.income,
    method: 'post',
  })
}
