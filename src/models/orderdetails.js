import modelExtend from 'dva-model-extend'
import { query, orderInfo } from 'src/services/orderdetails'
import key from 'src/utils/key'
import { message } from 'antd'
import { pageModel } from './system/common'

export default modelExtend(pageModel, {
  namespace: 'orderdetails',

  state: {
    orderInfos: [],
    expandedRowKeys: [],
    rowData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/order') {
          const serialNumber = location.query
          if (serialNumber) {
            dispatch({ type: 'query', payload: { ...location.query } })
          } else {
            dispatch({ type: 'querySuccess', payload: { list: [], pagination: { total: 0 } } })
          }
        }
      })
    },
  },

  effects: {
    *getOrderInfo({ payload = {} }, { call, put }) {
      const data = yield call(orderInfo, { orderSn: payload.serialNumber })
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            rowData: data.obj,
          },
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            rowData: [],
          },
        })
      }
    },

    *query({ payload = {} }, { call, put }) {
      let data = yield call(query, { page: 1, pageSize: 10, ...payload })
      if (data.code === 200) {
        data.obj = data.obj.map(item => ({ ...item, key: key() }))
        if (data.obj.length === 0) {
          message.warning('没有查询到相关数据')
        }
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
