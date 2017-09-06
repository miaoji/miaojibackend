import pathToRegexp from 'path-to-regexp'
import { query } from '../../services/wxuser'

export default {

  namespace: 'wxUserDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        if (location.pathname === '/wxuserdetail') {
          const match = location.search.split('?userId=')
          console.log('match',match)
          if (match[1]) {
            dispatch({ type: 'query', payload: { userId: match[1] } })
          }
        }
      })
    },
  },

  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, payload)
      const { success, message, status, ...other } = data
      console.log("other-obj",other.obj)
      delete other.obj.userId
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other.obj,
          },
        })
      } else {
        throw data.mess||'网络不行了!!!'
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
