import React from 'react'
import modelExtend from 'dva-model-extend'
import { message, Select } from 'antd'
import { initialCreateTime, storage } from 'utils'
import { query, create, update, remove } from '../services/qr'
import { query as queryParameterOption } from '../services/storeuser'
import { pageModel } from './system/common'

const { Option } = Select

export default modelExtend(pageModel, {
  namespace: 'qr',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    parameterOption: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/qr') {
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
        const storeuserArr = storage({ key: 'storeuserArr', json: true })
        const list = data.obj.obj.map((i) => {
          const itemInfo = storeuserArr.find(k => +i.parameter && +i.parameter === k.idUser) || {}
          return {
            ...i,
            address: itemInfo.address,
          }
        })
        yield put({
          type: 'querySuccess',
          payload: {
            list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.obj.total,
            },
          },
        })
      }
    },

    *create({ payload }, { call, put }) {
      const newQr = {
        param: payload.parameter.split('///')[0],
        name: payload.parameter.split('///')[1],
        remark: payload.remark,
      }
      const data = yield call(create, newQr)
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ qr }) => qr.currentItem.id)
      const newQr = {
        name: payload.name,
        remark: payload.remark,
        id,
      }
      const data = yield call(update, newQr)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('更新成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *getParameterOption(_, { call, put }) {
      const data = yield call(queryParameterOption, {
        page: 1,
        pageSize: 10000,
      })
      if (data.code === 200) {
        const option = data.obj.map((item) => {
          if (!item.name) {
            return false
          }
          const val = `${item.id}///${item.name}`
          return <Option key={val}>{`${item.name}-ID:${item.id}`}</Option>
        })
        yield put({
          type: 'updateState',
          payload: {
            parameterOption: option,
          },
        })
      } else {
        throw data.mess || data
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
