import { login } from '../services/login'
import { routerRedux } from 'dva/router'
import { queryURL, storage } from '../utils'
import md5 from 'js-md5'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  effects: {
    *login ({
      payload,
    }, { put, call }) {
      yield put({ type: 'showLoginLoading' })
      payload.password = md5(payload.password)
      const data = yield call(login, payload)
      yield put({ type: 'hideLoginLoading' })
      if (data.code === 200) {
        storage({
          key: 'token',
          val: data.obj[0].userId,
          type: 'set',
        })
        let userList = {}
        userList.trueName = data.obj[0].accounts
        userList.userId = data.obj[0].userId
        userList.userName = data.obj[0].name
        storage({
          key: 'user',
          val: JSON.stringify(userList),
          type: 'set',
        })
        const from = queryURL('from')
        yield put({ type: 'app/query' })
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data.mess || '网络不行了!!!'
      }
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
