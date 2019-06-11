import modelExtend from 'dva-model-extend'
import { notification } from 'antd'
import { APIV3, initialCreateTime, filterStoreSelect, pageModel, config } from '../../utils'
import { query } from './service'
import { download } from '../expressfeedetail/service'

const { backupDataEndTime } = config

export default modelExtend(pageModel, {
  namespace: 'backupexpressfee',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/backupexpressfee') {
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
      payload = initialCreateTime(payload, true, true)
      filterStoreSelect(payload)
      console.log('payload', payload)
      // download是否下载 0表示不下载,进行的是分页查询1表示的是按当前的筛选下载全部数据
      const data = yield call(query, { ...payload, download: 0 })
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
      payload = initialCreateTime(payload, true, backupDataEndTime)
      filterStoreSelect(payload)
      notification.success({
        message: '准备中...',
        description: '正在为您准备资源,请稍等!!!',
        duration: 3,
      })
      const data = yield call(download, { ...payload, tc: 'maild', download: 1 })
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

})
