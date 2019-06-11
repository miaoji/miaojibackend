import classnames from 'classnames'
import config from './config'
import request from './request'
import { color } from './theme'
import * as time from './time'
import { filterStoreSelect } from './filter'
import {
  getOrgId,
  getRoleId,
  getUserId,
  isSuperAdmin,
  getOrgIdUsers,
} from './getUserInfo'
import { pageParams, queryURL, queryArray, arrayToTree } from './toolkit'
import password from './password'
import { storage } from './storage'
import { pageModel } from './pageModel'

function filterLocation(filter) {
  const newpayload = { ...filter }
  const locationPayload = {}
  if (newpayload.location && newpayload.location.length > 0) {
    // 不要对传进来的newpayload直接修改,会直接影响原数据
    let location = newpayload.location.split(',')
    switch (location.length) {
      case 1:
        locationPayload.province = location[0]
        break
      case 2:
        locationPayload.city = location[1]
        break
      case 3:
        locationPayload.district = location[2]
        break
      default:
        break
    }
  }
  delete newpayload.location
  return { ...newpayload, ...locationPayload }
}

module.exports = {
  filterLocation,
  pageModel,
  config,
  password,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  storage,
  api: config.api,
  pageParams,
  time,
  APIV3: config.APIV3,
  handleFields: time.handleFields,
  initialCreateTime: time.initialCreateTime,
  defaultTime: time.defaultTime,
  filterStoreSelect,
  getOrgId,
  getRoleId,
  getUserId,
  isSuperAdmin,
  getOrgIdUsers,
}
