import { request, api, pageParams } from '../../utils'

const { brandcount } = api

export async function query(params) {
  params = pageParams(params)
  if (params.idUser) {
    params.userIds = params.idUser
    delete params.idUser
  }
  return request({
    url: brandcount.list,
    method: 'post',
    data: params,
  })
}
