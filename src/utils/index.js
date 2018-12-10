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

module.exports = {
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
