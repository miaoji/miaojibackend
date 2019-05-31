import modelExtend from 'dva-model-extend'
import { query, expanded } from '../../services/store/assignor'
import { initialCreateTime, time, pageModel } from '../../utils'

export default modelExtend(pageModel, {
  namespace: 'assignor',
  state: {
    expandedRowKeys: [],
    expandedList: [],
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
      payload = initialCreateTime(payload)
      let newpayload = {}
      if (!payload.startTime) {
        const times = time.yesterTime()
        newpayload = { ...times, ...payload }
      } else {
        newpayload = { ...payload }
      }
      const data = yield call(query, { ...newpayload })
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            expandedRowKeys: [],
          },
        })
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
    *queryBrandDetail({ payload = {} }, { put, call }) {
      const filter = initialCreateTime(payload.filter)
      let newFilter = {}
      if (!payload.startTime) {
        const times = time.yesterTime()
        newFilter = { ...times, ...filter }
      } else {
        newFilter = { ...filter }
      }
      const data = yield call(expanded, {
        idBinding: payload.item.id,
        ...newFilter,
      })
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            expandedList: data.obj,
          },
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            expandedList: [],
          },
        })
        throw data.mess || '数据请求失败,请稍后重试'
      }
    },
  },

  reducers: {},

})
