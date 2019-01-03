import modelExtend from 'dva-model-extend'
import { query, cashWithdraw } from 'src/services/wallet/withdraw'
import { initialCreateTime } from 'utils'
import { pageModel } from '../system/common'

export default modelExtend(pageModel, {
  namespace: 'withdraw',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
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
      console.log('payload', payload)
      const param = JSON.stringify({
        userId: currentItem.userId,
        price: currentItem.price,
        orderId: currentItem.orderId,
        status: payload.status,
        transferDetails: payload.transferDetails,
      })
      console.log('param', param)
      const data = yield call(cashWithdraw, { param })
      console.log('data', data)
      if (data.code === 200) {
        yield put({ type: 'query' })
        yield put({ type: 'hideModal' })
      } else {
        throw data.mess || '网络不行了!!!'
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
