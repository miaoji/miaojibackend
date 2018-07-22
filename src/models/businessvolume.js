import React from 'react'
import { message, notification } from 'antd'
import modelExtend from 'dva-model-extend'
import { config, initialCreateTime } from 'utils'
import { query, detail, count, downloadExcel as download } from '../services/businessvolume'
import { pageModel } from './system/common'

const { prefix, APIV3 } = config

export default modelExtend(pageModel, {
  namespace: 'businessvolume',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    expandedRowKeys: [],
    sonlist: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/businessvolume') {
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
      // 如果未选择时间 则默认查询为 前天~昨天的数据
      if (!payload.startTime) {
        let yesterdayDate = new Date()
        yesterdayDate.setTime(yesterdayDate.getTime() - 24 * 60 * 60 * 1000)
        payload.startTime = yesterdayDate.getTime()
        payload.endTime = new Date().getTime()
      }
      if (payload.idUser) {
        payload.idUser = payload.idUser.split('///')[0]
      }
      const data = yield call(query, { ...payload })
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
        message.error(data.mess || '网络错误')
      }
    },

    // 根据门店账号查询单号详细信息
    *infoId({ payload }, { call, put }) {
      payload = initialCreateTime(payload)
      const { idUser, startTime, endTime } = payload
      const data = yield call(detail, {
        idUser, startTime, endTime,
      })
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            sonlist: data.obj,
            expandedRowKeys: [payload.idUser],
          },
        })
      } else {
        message.error(data.mess || '网络错误')
      }
    },

    // 根据门店账号查询 按快递品牌分类的统计信息
    *countInfo({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          sonlist: {},
        },
      })
      payload = initialCreateTime(payload)
      const { idUser, startTime, endTime } = payload
      const data = yield call(count, {
        idUser, startTime, endTime,
      })
      if (data.code === 200) {
        let { obj } = data
        /**
         * someCargo入库数
         * scheduledReceipt点货数
         * signingVolume签收
         * returnAmount退回数
         */
        let list = {
          returnAmount: [],
          scheduledReceipt: [],
          signingVolume: [],
          someCargo: [],
        }
        const text1 = '快递品牌:'
        const text2 = ',数量:'
        for (let i = 0; i < obj.length; i++) {
          let item = obj[i]
          list.returnAmount.push(<p>{text1}{item.brandName}{text2}{item.returnAmount}</p>)
          list.scheduledReceipt.push(<p>{text1}{item.brandName}{text2}{item.scheduledReceipt}</p>)
          list.signingVolume.push(<p>{text1}{item.brandName}{text2}{item.signingVolume}</p>)
          list.someCargo.push(<p>{text1}{item.brandName}{text2}{item.someCargo}</p>)
        }
        yield put({
          type: 'updateState',
          payload: {
            sonlist: list,
            expandedRowKeys: [payload.idUser],
          },
        })
      } else {
        message.error(data.mess || '网络错误')
      }
    },

    *download({ payload }, { call }) {
      notification.success({
        message: '准备中...',
        description: '正在为您准备资源,请稍等!!!',
        duration: 3,
      })
      payload = initialCreateTime(payload)
      // 如果未选择时间 则默认查询为 前天~昨天的数据
      if (!payload.startTime) {
        let yesterdayDate = new Date()
        yesterdayDate.setTime(yesterdayDate.getTime() - 24 * 60 * 60 * 1000)
        payload.startTime = yesterdayDate.getTime()
        payload.endTime = new Date().getTime()
      }
      const newpayload = {
        startTime: payload.startTime,
        endTime: payload.endTime,
      }
      const data = yield call(download, { ...newpayload })
      if (data.code === 200 && data.obj) {
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
        throw data.mess || '无法跟服务器建立有效连接'
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
