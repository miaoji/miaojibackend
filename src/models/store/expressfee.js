import modelExtend from 'dva-model-extend'
import { notification } from 'antd'
import { query } from '../../services/store/expressfee'
import { pageModel } from '../system/common'
import { time, initialCreateTime } from '../../utils'
import { download } from '../../services/store/expressfeedetail'

export default modelExtend(pageModel, {
  namespace: 'expressfee',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/expressfee') {
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
        message: '准备中...',
        description: '正在为您准备资源,请稍等!!!',
        duration: 3,
      })
      let newpayload = {}
      if (!payload.startTime) {
        const times = time.yesterTime()
        newpayload = { ...times, ...payload }
      } else {
        newpayload = { ...payload }
      }
      const data = yield call(download, { ...newpayload, tc: 'maild', download: 1 })
      if (data.code === 200 && data.obj) {
        const url = data.obj
        const openUrl = window.open(url)
        if (openUrl === null) {
          notification.warn({
            message: '下载失败',
            description: '请关闭浏览阻止网页弹窗的功能!!!',
            duration: 3,
          })
        } else {
          notification.warn({
            message: '正在下载',
            description: '请等待!!!',
            duration: 3,
          })
        }
      } else {
        throw data.mess || '无法跟服务器建立有效连接'
      }
    },

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
    },

  },
})
