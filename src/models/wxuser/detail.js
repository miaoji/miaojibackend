import pathToRegexp from 'path-to-regexp'
import { query } from '../../services/wxuser'
import { queryURL } from '../../utils'

export default {

  namespace: 'wxUserDetail',

  state: {
    user: {},
    data: {}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        if (location.pathname === '/wxuserdetail') {
          const userId = queryURL('userId')
          const username = queryURL('username')
          const usermobile = queryURL('usermobile')
          // console.log('userId', userId)
          // console.log('usermobile', usermobile)
          if (userId) {
            dispatch({ type: 'query', payload: { userId } })
            dispatch({ type: 'setUser', payload: { user: { username,usermobile } } })
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
      delete other.obj.userId
      console.log("other.obj",other.obj)
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
    }
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },

    setUser (state, { payload }) {
      const { user } = payload
      return {
        ...state,
        user
      }
    }

  }
}
