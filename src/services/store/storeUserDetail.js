import { request, config, pageParams } from '../../utils'

const { api } = config
const { storeUserDetail } = api

export async function query(params) {
  params = pageParams(params)
  delete params.download
  delete params.pagination
  delete params.rownum
  delete params.showName
  delete params.location
  return request({
    url: storeUserDetail.all,
    method: 'post',
    data: params,
  })
}
