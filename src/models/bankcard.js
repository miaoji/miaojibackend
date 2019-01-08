import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { list, add, mod, del } from '../services/bankcard'
import { pageModel } from './system/common'

export default modelExtend(pageModel, {

  namespace: 'bankcard',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/bankcard') {
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
      const data = yield call(list, payload)
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
        throw data.mess || '当前网络无法使用'
      }
    },

    *create({ payload = {} }, { call, put }) {
      const data = yield call(add, payload)
      if (data.code === 200) {
        yield put({ type: 'query' })
        message.success('新增成功')
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *update({ payload = {} }, { call, put }) {
      const data = yield call(mod, payload)
      if (data.code === 200) {
        yield put({ type: 'query' })
        message.success('更新成功')
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *delete({ payload = {} }, { call, put }) {
      const data = yield call(del, payload)
      if (data.code === 200) {
        yield put({ type: 'query' })
        message.success('删除成功')
      } else {
        throw data.mess || '当前网络无法使用'
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
