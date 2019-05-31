import { request, config, pageParams } from '../../utils'

const { api } = config
const { storeSign } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: storeSign.all,
    method: 'post',
    data: params,
  })
}

export async function detailquery(params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  if (params.idUser) {
    delete params.userIds
    delete params.location
  }
  return request({
    url: storeSign.all,
    method: 'post',
    data: params,
  })
}
