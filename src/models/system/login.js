import { routerRedux } from 'dva/router'
import { queryURL, storage, password } from 'utils'
import { login as signIn, imgCode } from '../../services/system/login'
import { initUserInfo } from '../../utils/processing'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
    imgCode: '',
    uuid: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/login') {
          dispatch({ type: 'initImgCode' })
        }
      })
    },
  },
  effects: {
    *login({ payload }, { put, call, select }) {
      const uuid = yield select(({ login }) => login.uuid)
      payload.password = password(payload.password)
      yield put({ type: 'showLoginLoading' })
      const data = yield call(signIn, {
        accounts: payload.accounts,
        password: payload.password,
        verification: payload.verification,
        uuid,
      })
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
        yield put({ type: 'initImgCode' })
        throw data.mess || '当前网络不可用'
      }
      yield put({ type: 'hideLoginLoading' })
    },

    *initImgCode(_, { call, put }) {
      const uuid = new Date().getTime().toString()
      const data = yield call(imgCode, { uuid })
      if (data.code === 200) {
        yield put({
          type: 'setStates',
          payload: {
            imgCode: data.obj,
            uuid,
          },
        })
      } else {
        throw new Error('获取验证码失败')
      }
    },
  },
  reducers: {
    setStates(state, { payload }) {
      return { ...state, ...payload }
    },
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
