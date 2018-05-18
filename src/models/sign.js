/* 京东单号管理 */
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query } from '../services/sign'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'sign',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    list: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sign') {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    }
  },

  effects: {

    *query({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data.obj) {
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

    *create({ payload = {} }, { call, put }) {
      const data =yield call(orderSheet, payload)
      if (data.code === 200) {
        message.success('填充单号池已完成')
        yield put({
          type: 'query'
        })
        yield put({
          type: 'hideModal'
        })
      }
    }

  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: false }
    }
  }

})