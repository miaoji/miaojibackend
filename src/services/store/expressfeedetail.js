import { request, config, pageParams } from '../../utils'

const { api } = config
const { expressfeedetail } = api

export async function query(params) {
  params = pageParams(params)
  delete params.showName
  delete params.download
  delete params.location
  return request({
    url: expressfeedetail.all,
    method: 'post',
    data: params,
  })
}

export async function download(params) {
  params = pageParams(params)
  delete params.rownum
  delete params.pagination
  if (params.idUser) {
    delete params.location
  }
  return request({
    url: expressfeedetail.download,
    method: 'post',
    data: params,
  })
}
