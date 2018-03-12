/* 京东单号管理 */
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { findOrderSheetCount, setJDConfig, orderSheet, getJDConfig } from '../services/jd'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'jd',

  state: {
    currentItem: {},
    modalVisible: false,
    jdModalVisible: false,
    modalType: 'create',
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/jd') {
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
      const data = yield call(findOrderSheetCount, payload)
      const jdconfig = yield call(getJDConfig)

      if (data.obj&&jdconfig.obj) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: [data.obj, jdconfig.obj]
          }
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
    },

    *setjdconfig({ payload = {} }, { call, put }) {
      // return
      const item = JSON.stringify({brandId: 20, config: Number(payload.number)/100})
      const data =yield call(setJDConfig, {param: item})
      if (data.code === 200) {
        message.success('设置京东分成比例已完成')
        yield put({
          type: 'hideJdModal'
        })
        yield put({
          type: 'query'
        })
      }
    },

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
    },

    showJdModal(state, { payload }) {
      return { ...state, ...payload, jdModalVisible: true }
    },

    hideJdModal(state, { payload }) {
      return { ...state, ...payload, jdModalVisible: false }
    },

  }

})