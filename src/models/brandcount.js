import modelExtend from 'dva-model-extend'
import { config, initialCreateTime } from 'utils'
import { routerRedux } from 'dva/router'
import { query } from '../services/brandcount'
import { pageModel } from './system/common'
import { time } from '../utils'

const yesterTime = time.getToday(new Date().getTime() - 86400000)

const { prefix } = config
export default modelExtend(pageModel, {
  namespace: 'brandcount',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    echartShow: true,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/brandcount') {
          const { createTime } = location.query
          if (createTime) {
            dispatch({
              type: 'query',
              payload: location.query,
            })
          } else {
            dispatch(routerRedux.push({
              pathname: location.pathname,
              query: {
                ...query,
                createTime: [yesterTime, yesterTime],
              },
            }))
          }
        }
      })
    },
  },

  effects: {

    * query({ payload = {} }, { call, put }) {
      // 如果使用了日期选择器, 则需要配合initialCreateTime方法处理时间
      payload = initialCreateTime(payload)
      const data = yield call(query, { ...payload, page: 1, pageSize: 10000 })
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
