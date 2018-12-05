import modelExtend from 'dva-model-extend'
import { query, orderInfo } from 'src/services/orderdetails'
import { pageModel } from './system/common'

export default modelExtend(pageModel, {
  namespace: 'orderdetails',

  state: {
    orderInfos: [],
    expandedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/order' && location.query.serialNumber) {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *getOrderInfo({ payload = {} }, { call, put }) {
      const data = yield call(orderInfo, payload)
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            orderInfos: data.obj,
          },
        })
      }
    },

    *query({ payload = {} }, { call, put }) {
      let data = yield call(query, { page: 1, pageSize: 10, ...payload })
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
        yield put({
          type: 'querySuccess',
          payload: {
            list: [{ id: 1 }, { id: 2 }],
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: 20,
            },
          },
        })
        throw data.mess || '网络不行了!!!'
      }
    },

  },

  reducers: {},
})
