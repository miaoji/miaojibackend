import React from 'react'
import modelExtend from 'dva-model-extend'
import { initialCreateTime } from 'utils'
import { message, Select } from 'antd'
import { query as queryStoreUser } from '../../services/storeuser'
import { query, create, update, remove, getLocation } from '../../services/auth/organize'
import { query as queryRoleList } from '../../services/auth/role'
import { pageModel } from '../system/common'
import { editLocation } from '../../utils/processing'

const { Option } = Select

export default modelExtend(pageModel, {
  namespace: 'organize',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    storeuserList: [],
    roleList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/organize') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query({ payload = {} }, { call, put }) {
      payload = initialCreateTime(payload)
      const data = yield call(query, { parentorganizeId: 0, ...payload })
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
      const data = yield call(create, { ...payload })
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入输入的手机号已存在' : data.mess || data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ organize }) => organize.currentItem.id)
      const data = yield call(update, { ...payload, id })
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('更新成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(remove, [payload])
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入的idUser不存在或者输入的手机号已存在' : data.mess || data
      }
    },

    *queryStoreUser(_, { call, put }) {
      const data = yield call(queryStoreUser, {
        current: 1,
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

    *queryRoleList(_, { call, put }) {
      const data = yield call(queryRoleList, { page: 1, pageSize: 1000000 })
      if (data.code === 200 && data.obj) {
        const option = data.obj.map((item) => {
          return <Option key={item.ID}>{item.ROLE_NAME}</Option>
        })
        yield put({
          type: 'updateState',
          payload: {
            roleList: option,
          },
        })
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

  },

  reducers: {

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

  },
})
