import { request, config, pageParams } from '../../utils'

const { api } = config
const { consume } = api

export async function query(params) {
  const replParam = params
  params = { param: JSON.stringify(params) }
  params.page = replParam.page
  params.pageSize = replParam.pageSize
  let newparams = pageParams(params)
  return request({
    url: consume.list,
    method: 'post',
    data: newparams,
  })
}
