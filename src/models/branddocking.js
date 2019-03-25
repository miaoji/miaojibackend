import modelExtend from 'dva-model-extend'
import { query } from '../services/branddocking'
import { pageModel } from './system/common'

export default modelExtend(pageModel, {
  namespace: 'branddocking',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/branddocking') {
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
      let userIds
      payload.name ? userIds = payload.name.split('///')[0] : undefined
      const data = yield call(query, { ...payload, userIds })
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
  },

  reducers: {},
})
