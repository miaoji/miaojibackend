import modelExtend from 'dva-model-extend'
import { config, initialCreateTime } from 'utils'
import { message } from 'antd'
import { query, updateFee, versionswitch } from '../services/storeuser'
import { pageModel } from './system/common'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'storeuser',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    expandedRowKeys: [],
    columnslist: [],
    sonlist: [],
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/storeuser') {
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
      const data = yield call(query, { ...payload, superId: -1 })
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
      }
    },

    *update({ payload }, { call, put, select }) {
      payload.id = yield select(({ storeuser }) => storeuser.currentItem.id)

      const data = yield call(updateFee, payload)
      if (data.code === 200) {
        message.success('更新成功')
        yield put({ type: 'query' })
        yield put({ type: 'hideModal' })
      } else {
        message.success(data.mess || '网络错误')
      }
    },

    *versionswitch({ payload }, { call, put, select }) {
      payload.id = yield select(({ storeuser }) => storeuser.currentItem.id)

      const data = yield call(versionswitch, payload)

      if (data.code === 200) {
        message.success('切换成功')
        yield put({ type: 'query' })
        yield put({ type: 'hideModal' })
      } else {
        message.success(data.mess || '网络错误')
      }
    },

    // 根据主账号查询子账号
    *unfold({ payload }, { call, put }) {
      const data = yield call(query, { ...payload, page: 1, pageSize: 10000 })

      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            sonlist: data.obj,
            expandedRowKeys: [payload.superId],
          },
        })
      } else {
        message.success(data.mess || '网络错误')
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
