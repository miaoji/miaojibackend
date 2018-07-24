import React from 'react'
import modelExtend from 'dva-model-extend'
import { initialCreateTime } from 'utils'
import { message, Select } from 'antd'
import md5 from 'js-md5'
import { query, create, update, remove } from '../../services/auth/adminuser'
import { query as queryOrangeizeList } from '../../services/auth/org'
import { pageModel } from '../system/common'

const { Option } = Select

export default modelExtend(pageModel, {
  namespace: 'adminuser',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    confirmDirty: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/adminuser') {
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
      const data = yield call(query, payload)
      if (data) {
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
      if (payload.idUser) {
        payload.idUser = payload.idUser ? payload.idUser.split('///')[0] : undefined
      }
      if (payload.username) {
        payload.name = payload.username
        delete payload.username
      }
      if (payload.number) {
        payload.mobile = payload.number
        delete payload.number
      }
      payload.password = md5(payload.password)
      delete payload.repass
      const data = yield call(create, { ...payload })
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('新增成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *update({ payload }, { select, call, put }) {
      const item = yield select(({ adminuser }) => adminuser.currentItem)
      delete payload.password
      delete payload.repass
      if (payload.idUser === item.siteName) {
        delete payload.idUser
      } else {
        payload.idUser = payload.idUser ? payload.idUser.split('///')[0] : undefined
      }
      if (payload.roleId === item.roleName) {
        delete payload.roleId
      }
      const data = yield call(update, { ...payload, id: item.userId })
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('更新成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *resetPWD({ payload }, { call, select, put }) {
      const id = yield select(({ adminuser }) => adminuser.currentItem.id)
      payload.password = md5(payload.password)
      const data = yield call(update, { password: payload.password, id })
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('密码重置成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *queryOrangeizeList(_, { call, put }) {
      const data = yield call(queryOrangeizeList, { page: 1, pageSize: 10000 })
      console.log('data', data)
      if (data.code === 200) {
        let option = []
        if (data.obj && data.obj.length > 0) {
          option = data.obj.map((item) => {
            return <Option key={item.id} value={item.id}>{item.orgName}</Option>
          })
        }
        yield put({
          type: 'updateState',
          payload: {
            orangeizeList: option,
          },
        })
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

  },

  reducers: {

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false, confirmDirty: false }
    },

  },
})
