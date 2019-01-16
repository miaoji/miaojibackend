import { request, config, pageParams } from '../../utils'

const { api } = config
const { orderbyuser } = api

export async function query(params) {
  params = pageParams(params)
  delete params.location
  return request({
    url: orderbyuser.all,
    method: 'post',
    data: params,
  })
}

export async function download(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  if (params.idUser) {
    delete params.userIds
    delete params.location
  }
  return request({
    url: orderbyuser.all,
    method: 'post',
    data: params,
  })
}
