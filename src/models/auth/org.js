import React from 'react'
import modelExtend from 'dva-model-extend'
import { initialCreateTime } from 'utils'
import { message, Select } from 'antd'
import { query as queryStoreUser } from '../../services/storeuser'
import { query, create, update, remove, getLocation, getIdUsers } from '../../services/auth/org'
import { pageModel } from '../system/common'
import { editLocation } from '../../utils/processing'
import { getOrgId, getUserId } from '../../utils'

const { Option } = Select

export default modelExtend(pageModel, {
  namespace: 'org',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    storeuserList: [],
    orgIdusers: [],
    parentOrgList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/org') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query({ payload = {} }, { call, put, select }) {
      const locationList = yield select(({ org }) => org.locationList)
      if (!locationList) {
        yield put({
          type: 'queryLocation',
        })
      }
      payload = initialCreateTime(payload)
      const locationPayload = {}
      if (payload.location && payload.location.length > 0) {
        // 不要对传进来的payload直接修改,会直接影响原数据
        let location = payload.location.split(',')
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
      const data = yield call(query, { ...payload, ...locationPayload })
      if (data.code === 200 && data.obj) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *create({ payload }, { call, put }) {
      if (payload.location && payload.location[0] === '全国') {
        payload.location = []
        payload.idUsers = undefined
      } else {
        payload.idUsers = payload.idUsers.toString()
      }
      if (!payload.parentId) {
        payload.parentId = getOrgId()
      }
      debugger
      payload.location = payload.location.toString()
      payload.createUserId = getUserId()
      const data = yield call(create, { ...payload })
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入输入的手机号已存在' : data.mess || data
      }
    },

    *update({ payload }, { select, call, put }) {
      if (payload.location && payload.location[0] === '全国') {
        payload.location = []
        payload.idUsers = undefined
      } else {
        payload.idUsers = payload.idUsers.toString()
      }
      if (!payload.parentId) {
        payload.parentId = getOrgId()
      }
      const currentItem = yield select(({ org }) => org.currentItem)
      if (payload.parentId === currentItem.parentName) {
        delete payload.parentId
      }
      payload.location = payload.location.toString()

      const data = yield call(update, { ...payload, id: currentItem.id })
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('更新成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(remove, { ids: payload })
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入的idUser不存在或者输入的手机号已存在' : data.mess || data
      }
    },

    *queryStoreUser(_, { call, put }) {
      const data = yield call(queryStoreUser, {
        page: 1,
        pageSize: 10000,
      })
      if (data.code === 200 && data.obj) {
        const option = []
        data.obj.forEach((item) => {
          if (!item.name) {
            return false
          }
          option.push(<Option key={item.id} value={item.id}>{item.name}</Option>)
          return false
        })
        yield put({
          type: 'updateState',
          payload: {
            storeuserList: option,
          },
        })
      } else {
        throw '网络故障，请稍后重试' || data.mess
      }
    },

    *queryLocation(_, { call, put }) {
      const data = yield call(getLocation)
      let option = []
      if (data.code === 200 && data.obj) {
        option = data.obj.map((item) => {
          return editLocation(item)
        })
        yield put({
          type: 'updateState',
          payload: {
            locationList: option,
          },
        })
      }
    },

    *getIdUsers({ payload }, { call, put, select }) {
      let data = {}
      switch (payload.location.length) {
        case 1:
          data = yield call(getIdUsers, { province: payload.location[0], orgId: getOrgId() })
          break
        case 2:
          data = yield call(getIdUsers, { city: payload.location[1], orgId: getOrgId() })
          break
        case 3:
          data = yield call(getIdUsers, { idLocation: payload.location[2].split('///')[1], orgId: getOrgId() })
          break
        default:
          break
      }
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            orgIdusers: data.obj,
          },
        })
      } else if (data.code === 500 && data.mess === '未查询到信息') {
        const currentItem = yield select(({ org }) => org.currentItem)
        yield put({
          type: 'updateState',
          payload: {
            currentItem: { ...currentItem, idUsers: '' },
            orgIdusers: [],
          },
        })
      } else {
        throw data.mess || '当前网络异常'
      }
    },

    *initParentOrgList(_, { put, call }) {
      const data = yield call(query, { page: 1, pageSize: 10000 })
      if (data.code === 200) {
        const option = data.obj.map((item) => {
          return <Option value={item.id}>{item.orgName}</Option>
        })
        yield put({
          type: 'updateState',
          payload: {
            parentOrgList: option,
          },
        })
      }
    },

  },

  reducers: {

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false, orgIdusers: [] }
    },

  },
})
