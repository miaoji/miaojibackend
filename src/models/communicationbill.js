import React from 'react'
import { message, notification, Tag } from 'antd'
import modelExtend from 'dva-model-extend'
import { config, initialCreateTime, filterStoreSelect } from '../utils'
import { query, detail, count, download, brandList } from '../services/communicationbill'
import { pageModel } from './system/common'

const { prefix, APIV3, brandReverse } = config

export default modelExtend(pageModel, {
  namespace: 'communicationbill',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    expandedRowKeys: [],
    sonlist: {},
    rowExpandList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/communicationbill') {
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
      payload = initialCreateTime(payload, true)
      filterStoreSelect(payload)
      if (payload.idUser) {
        payload.userIds = String(payload.idUser)
        delete payload.idUser
      }
      const locationPayload = {}
      if (payload.location && payload.location.length > 0) {
        // 不要对传进来的payload直接修改,会直接影响原数据
        let location = payload.location.split(',')
        switch (location.length) {
          case 1:
            locationPayload.province = location[0]
            break
          case 2:
            locationPayload.city = location[1]
            break
          case 3:
            locationPayload.district = location[2]
            break
          default:
            break
        }
      }
      const data = yield call(query, { ...payload, ...locationPayload, location: undefined })
      if (data.code === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj || [],
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
      payload = initialCreateTime(payload, true)
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
      payload = initialCreateTime(payload, true)
      let { startTime, endTime, idUser } = payload
      const data = yield call(count, {
        idUser, startTime, endTime,
      })
      if (data.code === 200) {
        let list = {
          returnAmount: [], // 退回数
          scheduledReceipt: [], // 入库数
          signingVolume: [], // 签收
          someCargo: [], // 点货数
          retroactive: [], // 补签数
        }
        data.obj.forEach((item) => {
          const brandName = item.brandName
          const brandData = `${brandReverse[brandName]}///${brandName}`
          list.someCargo.push(<Tag color="#87d068"><a rel="noopener noreferrer" target="_blank" href={`/dockingDetail?idUser=${idUser}&idBrand=${brandData}&startTime=${startTime}&endTime=${endTime}&state=1///点货`}>{brandName}:{item.someCargo}</a></Tag>)
          list.scheduledReceipt.push(<Tag color="#2db7f5"><a rel="noopener noreferrer" target="_blank" href={`/dockingDetail?idUser=${idUser}&idBrand=${brandData}&startTime=${startTime}&endTime=${endTime}&state=101///入库`}>{brandName}:{item.scheduledReceipt}</a></Tag>)
          list.signingVolume.push(<Tag color="#108ee9"><a rel="noopener noreferrer" target="_blank" href={`/dockingDetail?idUser=${idUser}&idBrand=${brandData}&startTime=${startTime}&endTime=${endTime}&state=305///签收`}>{brandName}:{item.signingVolume}</a></Tag>)
          list.returnAmount.push(
            <Tag color="#f50">
              <a rel="noopener noreferrer" target="_blank" href={`/dockingDetail?idUser=${idUser}&idBrand=${brandData}&startTime=${startTime}&endTime=${endTime}&state=303///退回`}>{brandName}:{item.returnAmount}</a>
            </Tag>
          )
          list.retroactive.push(<Tag color="#03a9f4"><a rel="noopener noreferrer" target="_blank" href={`/dockingDetail?idUser=${idUser}&idBrand=${brandData}&startTime=${startTime}&endTime=${endTime}&state=303///退回`}>{brandName}:{item.retroactive || 0}</a></Tag>)
        })
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

    *download({ ...props }, { call }) {
      let { payload } = props
      notification.success({
        message: '准备中...',
        description: '正在为您准备资源,请稍等!!!',
        duration: 3,
      })
      payload = initialCreateTime(payload, true)
      filterStoreSelect(payload)
      if (payload.idUser) {
        payload.userIds = String(payload.idUser)
        delete payload.idUser
      }
      const locationPayload = {}
      if (payload.location && payload.location.length > 0) {
        // 不要对传进来的payload直接修改,会直接影响原数据
        let location = payload.location.split(',')
        switch (location.length) {
          case 1:
            locationPayload.province = location[0]
            break
          case 2:
            locationPayload.city = location[1]
            break
          case 3:
            locationPayload.district = location[2]
            break
          default:
            break
        }
      }
      const newpayload = {
        startTime: payload.startTime,
        endTime: payload.endTime,
        userIds: payload.userIds,
        idBrand: payload.idBrand,
        ...locationPayload,
      }
      const data = yield call(download, { ...newpayload, download: 1 })
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

    *querybrandlist({ payload = {} }, { call, put }) {
      payload = initialCreateTime(payload, true)
      const data = yield call(brandList, {
        ...payload,
        page: 1,
        pageSize: 10000,
      })
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            rowExpandList: data.obj,
          },
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            rowExpandList: [],
          },
        })
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
