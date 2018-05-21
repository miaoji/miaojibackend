import modelExtend from 'dva-model-extend'
import { config, initialCreateTime } from 'utils'
import { pageModel } from 'src/models/system/common'
import { query } from '../../services/storedata/income'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'income',

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
        if (location.pathname === '/income') {
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
