import modelExtend from 'dva-model-extend'
import { storage, pageModel } from '../../utils'
import { query } from '../../services/branddocking'

export default modelExtend(pageModel, {
  namespace: 'branddocking',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/branddocking') {
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
      let userIds
      payload.name ? userIds = payload.name.split('///')[0] : undefined
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
      const data = yield call(query, { ...payload, ...locationPayload, userIds, location: undefined })
      if (data) {
        const storeuserArr = storage({ key: 'storeuserArr', json: true })
        const list = data.obj.map((i) => {
          const itemInfo = storeuserArr.find(k => +i.idUser && +i.idUser === k.idUser) || {}
          return {
            ...i,
            address: itemInfo.address,
          }
        })
        yield put({
          type: 'querySuccess',
          payload: {
            list,
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

  reducers: {},
})
