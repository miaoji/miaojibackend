import { routerRedux } from 'dva/router'
import { queryURL, storage, password } from 'utils'
import { notification } from 'antd'
import { login as signIn, imgCode } from '../../services/system/login'
import { initUserInfo } from '../../utils/processing'

let count = storage({ key: 'loginErrorCount' })
let loginErrorStart = storage({ key: 'prohibitloginStart' })
if (loginErrorStart - new Date().getTime() > 1800000) {
  count = 0
  loginErrorStart = 0
}
export default {
  namespace: 'login',
  state: {
    loginLoading: false,
    imgCode: '',
    uuid: '',
    loginErrorCount: count ? Number(count) : 0,
    prohibitloginStart: loginErrorStart ? Number(loginErrorStart) : 0,
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
      // const uuid = yield select(({ login }) => login.uuid)
      payload.password = password(payload.password)
      yield put({ type: 'showLoginLoading' })
      const data = yield call(signIn, {
        accounts: payload.accounts,
        password: payload.password,
        // verification: payload.verification,
        // uuid,
      })
      if (data.success && data.code === 200) {
        // 处理获取的用户数据
        data.obj = initUserInfo(data.obj)
        storage({ type: 'set', key: 'user', val: JSON.stringify(data.obj) })
        storage({ type: 'set', key: 'loginTime', val: new Date().getTime() })
        storage({ type: 'set', key: 'token', val: data.obj.token })
        storage({ type: 'remove', key: 'loginErrorCount' })
        storage({ type: 'remove', key: 'prohibitloginStart' })
        const from = queryURL('from')
        yield put({ type: 'app/query' })
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
        yield put({
          type: 'setStates',
          payload: {
            loginErrorCount: 0,
            prohibitloginStart: 0,
          },
        })
      } else if (data.mess === '用户名或密码错误' || data.mess === '账号不存在!' || data.mess === '账号与密码不匹配') {
        const loginErrorCount = (yield select(({ login }) => login.loginErrorCount)) + 1
        const prohibitloginStart = new Date().getTime()
        yield put({ type: 'initImgCode' })
        storage({ type: 'set', key: 'loginErrorCount', val: loginErrorCount })
        if (loginErrorCount > 4) {
          storage({ type: 'set', key: 'prohibitloginStart', val: prohibitloginStart })
          notification.warning({
            message: '登录提醒',
            description: '由于登录失败过多,系统将限制你的登录行为',
          })
        }
        yield put({
          type: 'hideLoginLoading',
          payload: {
            loginErrorCount,
            prohibitloginStart: loginErrorCount > 4 ? prohibitloginStart : 0,
          },
        })
        throw data.mess || '当前网络不可用'
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
    hideLoginLoading(state, { payload }) {
      return {
        ...state,
        ...payload,
        loginLoading: false,
      }
    },
  },
}
