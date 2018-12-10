import { getLocation } from '../utils/getUserInfo'
import { request, config, pageParams } from '../utils'

const { api } = config
const { blacklist } = api
export async function query(params) {
  params = pageParams(params)
  params.location = getLocation().length ? getLocation() : undefined
  return request({
    url: blacklist.all,
    method: 'post',
    data: params,
  })
}

export async function create(params) {
  return request({
    url: blacklist.add,
    method: 'post',
    params,
  })
}

export async function update(params) {
  return request({
    url: blacklist.update,
    method: 'post',
    params,
  })
}

export async function remove(params) {
  return request({
    url: blacklist.update,
    method: 'post',
    params,
  })
}
