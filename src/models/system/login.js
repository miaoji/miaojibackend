import { routerRedux } from 'dva/router'
import { queryURL, storage } from 'utils'
import md5 from 'js-md5'
import { login } from '../../services/system/login'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  effects: {
    * login({
      payload,
    }, { put, call }) {
      payload.password = md5(payload.password)
      yield put({ type: 'showLoginLoading' })
      const data = yield call(login, payload)
      if (data.success && data.code === 200) {
        storage({ type: 'set', key: 'user', val: JSON.stringify(data.obj) })
        storage({ type: 'set', key: 'loginTime', val: new Date().getTime() })
        const from = queryURL('from')
        yield put({ type: 'app/query' })
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        yield put({ type: 'hideLoginLoading' })
        throw data.mess
      }
      yield put({ type: 'hideLoginLoading' })
    },
  },
  reducers: {
    showLoginLoading(state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading(state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
