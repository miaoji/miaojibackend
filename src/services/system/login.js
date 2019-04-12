import { request, config, getUserId } from 'utils'

const { api } = config
const { userLogin } = api

export async function login(data) {
  return request({
    url: userLogin.login,
    method: 'post',
    data,
  })
}

export async function getMenus(params) {
  return request({
    url: userLogin.getMenus,
    method: 'post',
    data: { ...params, requestId: getUserId() },
  })
}

export async function imgCode(params) {
  return request({
    url: userLogin.imgCode,
    method: 'get',
    params,
  })
}
