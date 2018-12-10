import { request, config, pageParams } from '../../utils'

const { api } = config
const { problem } = api

export async function query(params) {
  params = pageParams(params)
  delete params.download
  return request({
    url: problem.all,
    method: 'post',
    data: params,
  })
}

export async function gitBrandByIdUser(params) {
  delete params.page
  delete params.pageSize
  delete params.download
  return request({
    url: problem.gitBrandByIdUser,
    method: 'post',
    data: params,
  })
}
