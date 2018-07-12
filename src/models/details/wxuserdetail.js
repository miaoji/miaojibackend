// import { queryById } from '../../services/wxuser'
import { queryURL } from '../../utils'

const alias = {
  username: '用户名',
  usermobile: '电话号码',
}

export default {

  namespace: 'wxuserdetail',

  state: {
    user: {},
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        if (location.pathname === '/wxuserdetail') {
          const userId = queryURL('userId')
          const username = queryURL('username')
          const usermobile = queryURL('usermobile')
          if (userId) {
            // dispatch({ type: 'query', payload: { userId } })
            dispatch({ type: 'setUser', payload: { user: { [alias.username]: username, [alias.usermobile]: usermobile } } })
          }
        }
      })
    },
  },

  effects: {
    // *query ({
    //   payload,
    // }, { call, put }) {
    //   const data = yield call(queryById, payload)
    //   const { success, message, status, ...other } = data
    //   delete other.obj.userId
    //   if (success) {
    //     yield put({
    //       type: 'querySuccess',
    //       payload: {
    //         data: other.obj,
    //       },
    //     })
    //   } else {
    //     throw data.mess || '网络不行了!!!'
    //   }
    // },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },

    setUser(state, { payload }) {
      const { user } = payload
      return {
        ...state,
        user,
      }
    },

  },
}
