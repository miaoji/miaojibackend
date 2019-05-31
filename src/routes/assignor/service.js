import request from '../../utils/request'
import { api } from '../../utils/config'
import { pageParams } from '../../utils/toolkit'

const { assignor } = api

export function query(params) {
  params = pageParams(params)
  return request({
    url: assignor.all,
    method: 'post',
    data: params,
  })
}

export function expanded(params) {
  delete params.page
  delete params.pageSize
  return request({
    url: assignor.expanded,
    method: 'post',
    data: params,
  })
}
