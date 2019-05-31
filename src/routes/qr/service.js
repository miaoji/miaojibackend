import { config } from '../../utils'
import mainRequest from '../../utils/mainRequest'

const { qr } = config.api
const pageParams = function (params) {
  params = { ...params } || {
    pagination: 1,
    rownum: 10,
  }
  params.pagination = params.page || 1
  params.rownum = params.pageSize || 10
  return params
}

export async function querydetail(params) {
  return mainRequest({
    url: qr.show,
    method: 'get',
    data: params,
  })
}

export async function query(params) {
  params = pageParams(params)
  return mainRequest({
    url: qr.all,
    method: 'get',
    data: params,
  })
}

export async function create(params) {
  return mainRequest({
    url: qr.create,
    method: 'post',
    params,
  })
}

export async function update(params) {
  return mainRequest({
    url: qr.update,
    method: 'post',
    params,
  })
}

export async function remove(params) {
  return mainRequest({
    url: qr.del,
    method: 'post',
    params,
  })
}
