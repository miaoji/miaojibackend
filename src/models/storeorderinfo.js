import React from 'react'
import modelExtend from 'dva-model-extend'
import { notification } from 'antd'
import { query, downLoad, getStoreInfo } from '../services/storeorderinfo'
import { pageModel } from './common'
import { config, time } from '../utils'

const { APIV3 } = config

export default modelExtend(pageModel, {
  namespace: 'storeorderinfo',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    storeList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/storeorderinfo') {
          dispatch({ type: 'getStoreInfo' })
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
        duration: 5
      })
      let newpayload = {}
      if (!payload.startTime) {
        const times = time.yesterTime()
        newpayload = { ...times, ...payload }
      } else {
        newpayload = { ...payload }
      }
      const data = yield call(downLoad, { ...newpayload, download: 1 })
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

    *getStoreInfo({ payload }, { call, put }) {
      const res = yield call(getStoreInfo)
      if (res.code === 200) {
        let children = []
        for (let i = 0; i < res.obj.length; i++) {
          let item = res.obj[i]
          children.push(<Option title={`${item.name}`} key={`${item.name}/-/${item.idUser}`}>{item.name}</Option>)
        }
        yield put({
          type: 'setStates',
          payload: {
            storeList: children
          }
        })
      }
    },

  },

  reducers: {
    setStates(state, { payload }) {
      return { ...state, ...payload }
    },
  },
})
