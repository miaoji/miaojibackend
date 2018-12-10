import { routerRedux } from 'dva/router'
import { queryURL, storage, password } from 'utils'
import { login } from '../../services/system/login'
import { initUserInfo } from '../../utils/processing'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  effects: {
    * login({
      payload,
    }, { put, call }) {
      payload.password = password(payload.password)
      yield put({ type: 'showLoginLoading' })
      const data = yield call(login, payload)
      if (data.success && data.code === 200) {
        // 处理获取的用户数据
        data.obj = initUserInfo(data.obj)
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
        throw data.mess || '当前网络不可用'
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
