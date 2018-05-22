import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      // 默认渲染首页
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          // 登陆页
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/system/login'))
              cb(null, require('./routes/system/login/'))
            }, 'login')
          },
        },
        {
          // 首页
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        },
        {
          // 也是页面
          path: 'user',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user'))
              cb(null, require('./routes/user/'))
            }, 'user')
          },
        },
        {
          // 测试页面子页
          path: 'user/:id',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/details/userdetail'))
              cb(null, require('./routes/user/detail/'))
            }, 'user-detail')
          },
        },
        {
          // 门店用户
          path: 'storeuser',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/storeuser'))
              cb(null, require('./routes/storeuser/'))
            }, 'storeuser')
          },
        },
        {
          // 微信用户页面
          path: 'wxuser',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/wxuser'))
              cb(null, require('./routes/wxuser/'))
            }, 'wxuser')
          },
        },
        {
          // 收支数据>收入
          path: 'income',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/storedata/income'))
              cb(null, require('./routes/storedata/income/'))
            }, 'income')
          },
        },
        {
          // 收支数据>支出
          path: 'expend',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/storedata/expend'))
              cb(null, require('./routes/storedata/expend/'))
            }, 'expend')
          },
        },
        {
          // 文章管理>发布列表
          path: 'articles',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/articles'))
              cb(null, require('./routes/articles/'))
            }, 'articles')
          },
        },
        {
          // 文章管理>文章发布
          path: 'publish',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/publish'))
              cb(null, require('./routes/publish/'))
            }, 'publish')
          },
        },
        {
          // 钱包管理>充值记录
          path: 'topup',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/wallet/topup'))
              cb(null, require('./routes/wallet/topup/'))
            }, 'topup')
          },
        },
        {
          // 钱包管理>提现记录
          path: 'withdraw',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/wallet/withdraw'))
              cb(null, require('./routes/wallet/withdraw/'))
            }, 'withdraw')
          },
        },
        {
          // 运单管理
          path: 'order',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/order'))
              cb(null, require('./routes/order/'))
            }, 'order')
          },
        },
        {
          // 推广管理
          path: 'qr',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/qr'))
              cb(null, require('./routes/qr/'))
            }, 'qr')
          },
        },
        {
          // 二维码图片
          path: 'qrdetail',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/details/qrdetail'))
              cb(null, require('./routes/qr/detail/'))
            }, 'qrdetail')
          },
        },
        {
          // 充值消费
          path: 'consume',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/consume'))
              cb(null, require('./routes/consume/'))
            }, 'consume')
          },
        },
        {
          // 黑名单
          path: 'blacklist',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/blacklist'))
              cb(null, require('./routes/blacklist/'))
            }, 'blacklist')
          },
        },
        {
          // 京东单号管理
          path: 'jd',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/jd'))
              cb(null, require('./routes/jd/'))
            }, 'jd')
          },
        },
        {
          // 单号规则配置
          path: 'ordernumber',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/ordernumber'))
              cb(null, require('./routes/ordernumber/'))
            }, 'ordernumber')
          },
        },
        {
          // 门店用户>门店操作人详情
          path: 'storeuserdetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/details/storeuserdetail'))
              cb(null, require('./routes/storeuser/detail/'))
            }, 'storeuser-detail')
          },
        },
        {
          // 门店用户>门店操作人详情>操作人寄件汇总
          path: 'operator',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/operator'))
              cb(null, require('./routes/store/operator/'))
            }, 'operator')
          },
        },
        {
          // 门店寄件金额
          path: 'expressfee',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/expressfee'))
              cb(null, require('./routes/store/expressfee/'))
            }, 'expressfee')
          },
        },
        {
          // 门店寄件金额>门店单号汇总
          path: 'expressfeedetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/expressfeedetail'))
              cb(null, require('./routes/store/expressfeedetail/'))
            }, 'expressfeedetail')
          },
        },
        {
          // 门店操作
          path: 'business',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/business'))
              cb(null, require('./routes/store/business/'))
            }, 'business')
          },
        },
        {
          // 门店操作>操作人
          path: 'operatorbyname',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/operatorbyname'))
              cb(null, require('./routes/store/operatorbyname/'))
            }, 'operatorbyname')
          },
        },
        {
          // 门店操作>操作人>快件详情
          path: 'orderbyuser',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/orderbyuser'))
              cb(null, require('./routes/store/orderbyuser/'))
            }, 'orderbyuser')
          },
        },
        {
          // 门店签收
          path: 'storeSign',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/storeSign'))
              cb(null, require('./routes/store/storeSign/'))
            }, 'storeSign')
          },
        },
        {
          // 门店签收>签收订单详情
          path: 'storeSignDetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/storeSignDetail'))
              cb(null, require('./routes/store/storeSignDetail/'))
            }, 'storeSignDetail')
          },
        },
        {
          // 门店分派
          path: 'selectfenpai',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/selectfenpai'))
              cb(null, require('./routes/store/selectfenpai/'))
            }, 'selectfenpai')
          },
        },
        {
          // 门店分派>操作人分派详情
          path: 'selectpjjeDetails',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/selectpjjeDetails'))
              cb(null, require('./routes/store/selectpjjeDetails/'))
            }, 'selectpjjeDetails')
          },
        },
        {
          // 门店问题件
          path: 'problem',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/problem'))
              cb(null, require('./routes/store/problem/'))
            }, 'problem')
          },
        },
        {
          // 黑名单订单详情
          path: 'blacklistdetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/blacklistdetail'))
              cb(null, require('./routes/store/blacklistdetail/'))
            }, 'blacklistdetail')
          },
        },
        {
          path: '*',
          // 没有路由匹配的页面 渲染404
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/system/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
}

export default Routers
