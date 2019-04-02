import { request, config } from 'utils'

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
    data: params,
  })
}

export async function imgCode(params) {
  return request({
    url: userLogin.imgCode,
    method: 'post',
    data: params,
  })
}
