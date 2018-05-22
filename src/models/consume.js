import modelExtend from 'dva-model-extend'
import { query } from '../services/consume'
import { pageModel } from './system/common'
import { config, initialCreateTime } from '../utils'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'consume',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/consume') {
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
      // 转换提交的交易类型的数据
      payload = initialCreateTime(payload)
      if (typeof (payload.transactionType) === 'string') {
        payload.transactionType = [payload.transactionType]
      }
      // 转换提交的订单状态的数据
      if (typeof (payload.status) === 'string') {
        payload.status = [payload.status]
      }
      // 转换提交的支付方式的数据
      if (typeof (payload.paymentMethod) === 'string') {
        payload.paymentMethod = [payload.paymentMethod]
      }
      // return
      let data = yield call(query, payload)
      if (data.code === 200) {
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
      } else {
        throw data.msg || '网络不行了!!!'
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

    switchIsMotion(state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
