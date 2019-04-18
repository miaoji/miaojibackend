import modelExtend from 'dva-model-extend'
import { notification } from 'antd'
import { query, download } from '../services/log'
import { pageModel } from './system/common'
import { APIV3 } from '../utils'

export default modelExtend(pageModel, {
  namespace: 'log',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/log') {
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
      const record = { ...payload }
      if (record.createTime && record.createTime.length === 2) {
        record.startTime = `${record.createTime[0]} 00:00:00`
        record.endTime = `${record.createTime[0]} 23:59:59`
      }
      delete record.createTime
      const data = yield call(query, { ...record })
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

    *download({ payload = {} }, { call }) {
      const record = { ...payload }
      if (record.createTime && record.createTime.length === 2) {
        record.startTime = `${record.createTime[0]} 00:00:00`
        record.endTime = `${record.createTime[0]} 23:59:59`
      }
      delete record.createTime
      const data = yield call(download, { ...record })
      if (data.code === 200) {
        const url = APIV3 + data.obj
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
        throw data.mess || '当前网络无法使用'
      }
    },
  },

  reducers: {},
})
