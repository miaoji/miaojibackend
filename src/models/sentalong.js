import modelExtend from 'dva-model-extend'
import { query, download } from '../services/sentalong'
import { pageModel } from './common'
import { time, config } from '../utils'
import { message, notification } from 'antd'

const { APIV3 } = config

export default modelExtend(pageModel, {
  namespace: 'sentalong',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sentalong') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query({ payload }, { call, put }) {
      let newpayload = {}
      if (!payload.startTime) {
        const times = time.yesterTime()
        newpayload = { ...times, ...payload }
      } else {
        newpayload = { ...payload }
      }
      // download是否下载 0表示不下载,进行的是分页查询1表示的是按当前的筛选下载全部数据
      const data = yield call(query, { ...newpayload, download: 0 })
      if (data.obj) {
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

    *download({ payload }, { call }) {
      notification.success({
        message: '下载中...',
        description: '正在为您准备资源,请稍等!!!',
        duration: 0
      })
      let newpayload = {}
      if (!payload.startTime) {
        const times = time.yesterTime()
        newpayload = { ...times, ...payload }
      } else {
        newpayload = { ...payload }
      }
      const res = yield call(download, { ...newpayload, download: 1 })
      if (res.code === 200 && res.obj) {
        const open = window.open(`${APIV3}${res.obj}`)
        if (open === null) {
          notification.warn({
            message: '下载失败',
            description: '请关闭浏览阻止网页弹窗的功能!!!',
            duration: 0
          })
        }
      } else {
        message.error(res.mess || '无法跟服务器建立有效连接')
      }
    }

  },

  reducers: {

    setSiteName(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    }

  }
})
