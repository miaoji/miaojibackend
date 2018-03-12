// import React from 'react'
import modelExtend from 'dva-model-extend'
import { notification } from 'antd'
import { query, downLoad } from '../services/selectshelves'
import { pageModel } from './common'
import { config, time } from '../utils'
import { message } from 'antd'

const { APIV3 } = config

export default modelExtend(pageModel, {
  namespace: 'selectshelves',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/selectshelves') {
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
      // download是否下载 0表示不下载,进行的是分页查询1表示的是按当前的筛选下载全部数据
      const data = yield call(query, { ...times, ...payload, download: 0 })
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
