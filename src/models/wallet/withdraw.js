import modelExtend from 'dva-model-extend'
import { query, cashWithdraw } from 'src/services/wallet/withdraw'
import { query as storeuserQuery } from 'src/services/storeuser'
import { initialCreateTime } from 'utils'
import { pageModel } from '../system/common'

export default modelExtend(pageModel, {
  namespace: 'withdraw',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    examineBalance: 0,
  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/withdraw') {
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
        throw data.mess || '网络不行了!!!'
      }
    },

    *cashWithdraw({ payload = {} }, { call, select, put }) {
      const currentItem = yield select(({ withdraw }) => withdraw.currentItem)
      const data = yield call(cashWithdraw, {
        userId: currentItem.userId,
        price: currentItem.price,
        orderId: currentItem.orderId,
        status: payload.status,
        customerCode: currentItem.customerCode,
        transferDetails: payload.transferDetails,
      })
      if (data.code === 200) {
        yield put({ type: 'query' })
        yield put({ type: 'hideModal' })
      } else {
        throw data.mess || '网络不行了!!!'
      }
    },

    *showBalance({ payload = {} }, { call, put }) {
      const data = yield call(storeuserQuery, { id: payload.id })
      console.log('data', data)
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            examineBalance: data.obj[0].balance || 0,
          },
        })
      } else {
        throw data.mess || '门店余额获取异常'
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
