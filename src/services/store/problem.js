import { request, config, pageParams } from '../../utils'

const { api } = config
const { problem } = api

export async function query (params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  delete params.download
  params = JSON.stringify(params)
  return request({
    url: problem.all,
    method: 'parampost',
    params: {
      param: params,
    },
  })
}

export async function gitBrandByIdUser (params) {
  delete params.page
  delete params.pageSize
  delete params.download
  params = JSON.stringify(params)
  return request({
    url: problem.gitBrandByIdUser,
    method: 'parampost',
    params: {
      param: params,
    },
  })
}
