import modelExtend from 'dva-model-extend'
import { config, initialCreateTime } from 'utils'
import { message } from 'antd'
import { query, updateFee } from '../services/storeuser'
import { pageModel } from './system/common'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'storeuser',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    columnslist: [],
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
      const data = yield call(query, payload)
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

    * queryColumnslist({ payload = {} }, { call, put }) {
      // const list = yield select(({ storeuser }) => storeuser.list)
      const data = yield call(query, payload)
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            columnslist: data.obj,
          },
        })
      }
    },

    *update({ payload }, { call, put, select }) {
      payload.id = yield select(({ storeuser }) => storeuser.currentItem.id)

      console.log('select', payload)
      const data = yield call(updateFee, payload)
      if (data.code === 200) {
        message.success('更新成功')
        yield put({ type: 'query' })
        yield put({ type: 'hideModal' })
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

    switchIsMotion(state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
