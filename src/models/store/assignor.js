import modelExtend from 'dva-model-extend'
import { query } from '../../services/store/business'
import { pageModel } from '../system/common'

export default modelExtend(pageModel, {
  namespace: 'assignor',
  state: {
    expandedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/assignor') {
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
      const data = yield call(query, { ...payload })
      if (data.code === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageModel) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data.msg || '当前网络无法使用'
      }
    },
    *queryBrandDetail({ payload = {} }, { put }) {
      console.log('s', payload)
      yield put({
        type: 'updateStete',
      })
    },
  },

  reducers: {},

})
