import { request, api, pageParams } from '../utils'

const { docking } = api

export async function query() {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        code: 200,
        msg: '查询成功',
        obj: [
          { id: 1, name: '妙寄第1测试店', a: 1, b: 2, c: 3, d: 4 },
          { id: 2, name: '妙寄第2测试店', a: 1, b: 2, c: 3, d: 4 },
          { id: 3, name: '妙寄第3测试店', a: 1, b: 2, c: 3, d: 4 },
          { id: 4, name: '妙寄第4测试店', a: 1, b: 2, c: 3, d: 4 },
          { id: 5, name: '妙寄第5测试店', a: 1, b: 2, c: 3, d: 4 },
        ],
      })
    }, 1000)
  })
}

export async function download(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: docking.list,
    method: 'post',
    data: params,
  })
}

export async function detail(params) {
  params = pageParams(params)
  return request({
    url: docking.detail,
    method: 'post',
    data: params,
  })
}

export async function count(params) {
  params = pageParams(params)
  return request({
    url: docking.count,
    method: 'post',
    data: params,
  })
}

export async function downloadExcel(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: docking.detail,
    method: 'post',
    data: params,
  })
}

export function downloadDetailExcel(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: docking.detail,
    method: 'post',
    data: params,
  })
}

export function brandList(params) {
  params = pageParams(params)
  return request({
    url: docking.brandList,
    method: 'post',
    data: params,
  })
}
