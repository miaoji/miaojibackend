// import React from 'react'
import modelExtend from 'dva-model-extend'
import { message, notification } from 'antd'
import { query, downLoad } from '../services/storeorderinfo'
import { pageModel } from './common'
import { config, time } from '../utils'

const { APIV3 } = config

export default modelExtend(pageModel, {
  namespace: 'storeorderinfo',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/storeorderinfo') {
          // const querys = location.query
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
      if (!payload.startTime) {
        message.info('默认查询昨日一天的数据')
      }
      const times = time.yesterTime()
      const data = yield call(query, { ...times, ...payload, download: 0 })
      console.log('data', data)
      // const data = yield call(query, { ...payload, download: 0 })
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
      if (!payload.startTime) {
        message.info('默认下载昨天一天的数据')
      }
      const times = time.yesterTime()
      const data = yield call(downLoad, { ...times, ...payload, download: 1 })
      if (data.code === 200 && data.obj) {
        const url = data.obj
        const sssss = window.open(`${APIV3}${url}`)
        if (sssss === null) {
          notification.warn({
            message: '下载失败',
            description: '请关闭浏览阻止网页弹窗的功能!!!',
            duration: 0
          })
        }
      } else {
        throw data.mess || '无法跟服务器建立有效连接'
      }
    },

  },

  reducers: {},
})
