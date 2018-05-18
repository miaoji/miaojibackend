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
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'user',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user'))
              cb(null, require('./routes/user/'))
            }, 'user')
          },
        }, {
          path: 'user/:id',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user/detail'))
              cb(null, require('./routes/user/detail/'))
            }, 'user-detail')
          },
        }, {
          path: 'wxuser',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wxuser'))
              cb(null, require('./routes/wxuser/'))
            }, 'wxuser')
          },
        }, {
          path: 'wxuserdetail',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wxuser/detail'))
              cb(null, require('./routes/wxuser/detail/'))
            }, 'wxuser-detail')
          },
        }, {
          path: 'storeuser',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/storeuser'))
              cb(null, require('./routes/storeuser/'))
            }, 'storeuser')
          },
        }, {
          path: 'storeuserdetail',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/storeuser/detail'))
              cb(null, require('./routes/storeuser/detail/'))
            }, 'storeuser-detail')
          },
        }, {
          path: 'message',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/message'))
              cb(null, require('./routes/message/'))
            }, 'message')
          },
        }, {
          path: 'message/:id',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/message/detail'))
              cb(null, require('./routes/message/detail/'))
            }, 'message-detail')
          },
        }, {
          path: 'communication',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/communication'))
              cb(null, require('./routes/communication/'))
            }, 'communication')
          },
        },
        {
          path: 'income',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/income'))
              cb(null, require('./routes/income'))
            }, 'income')
          },
        },
        {
          path: 'expend',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/expend'))
              cb(null, require('./routes/expend'))
            }, 'expend')
          },
        },
        {
          path: 'normal',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/normal'))
              cb(null, require('./routes/normal'))
            }, 'normal')
          },
        },
        {
          path: 'collect',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/collect'))
              cb(null, require('./routes/collect'))
            }, 'collect')
          },
        },
        {
          path: 'collection',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/collection'))
              cb(null, require('./routes/collection'))
            }, 'collection')
          },
        },
        {
          path: 'topups',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/topup'))
              cb(null, require('./routes/wallet/topup'))
            }, 'topups')
          },
        }, {
          path: 'withdraws',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/withdraw'))
              cb(null, require('./routes/wallet/withdraw'))
            }, 'withdraws')
          },
        }, {
          path: 'order',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order'))
              cb(null, require('./routes/order/'))
            }, 'order')
          },
        }, {
          path: 'consume',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/consume'))
              cb(null, require('./routes/consume/'))
            }, 'consume')
          },
        }, {
          path: 'qr',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/qr'))
              cb(null, require('./routes/qr/'))
            }, 'qr')
          },
        }, {
          path: 'qrdetail',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/qr/detail'))
              cb(null, require('./routes/qr/detail'))
            }, 'qr-detail')
          },
        }, {
          path: 'login',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'blacklist',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/blacklist'))
              cb(null, require('./routes/blacklist/'))
            }, 'blacklist')
          },
        }, {
          path: 'mailprice',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/mailprice'))
              cb(null, require('./routes/mailprice/'))
            }, 'mailprice')
          },
        }, {
          path: 'storeordertotal',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/storeordertotal'))
              cb(null, require('./routes/storeordertotal/'))
            }, 'storeordertotal')
          },
        }, {
          path: 'storeorderinfo',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/storeorderinfo'))
              cb(null, require('./routes/storeorderinfo/'))
            }, 'storeorderinfo')
          },
        }, {
          path: 'ordernumber',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/ordernumber'))
              cb(null, require('./routes/ordernumber/'))
            }, 'ordernumber')
          },
        }, {
          path: 'publish',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/publish'))
              cb(null, require('./routes/publish/'))
            }, 'publish')
          },
        }, {
          path: 'jd',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/jd'))
              cb(null, require('./routes/jd/'))
            }, 'jd')
          },
        }, {
          path: 'sign',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sign'))
              cb(null, require('./routes/sign/'))
            }, 'sign')
          },
        }, {
          path: 'sendtotal',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sendtotal'))
              cb(null, require('./routes/sendtotal/'))
            }, 'sendtotal')
          },
        }, {
          path: 'selectshelves',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/selectshelves'))
              cb(null, require('./routes/selectshelves/'))
            }, 'selectshelves')
          },
        }, {
          path: 'sentalong',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sentalong'))
              cb(null, require('./routes/sentalong/'))
            }, 'sentalong')
          },
        }, {
          path: 'expressfee',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/expressfee'))
              cb(null, require('./routes/store/expressfee/'))
            }, 'expressfee')
          },
        }, {
          path: 'operator',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/operator'))
              cb(null, require('./routes/store/operator/'))
            }, 'operator')
          },
        }, {
          path: 'expressfeedetail',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/expressfeedetail'))
              cb(null, require('./routes/store/expressfeedetail/'))
            }, 'expressfeedetail')
          },
        }, {
          path: 'business',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/business'))
              cb(null, require('./routes/store/business/'))
            }, 'business')
          },
        }, {
          path: 'operatorbyname',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/operatorbyname'))
              cb(null, require('./routes/store/operatorbyname/'))
            }, 'operatorbyname')
          },
        }, {
          path: 'orderbyuser',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/orderbyuser'))
              cb(null, require('./routes/store/orderbyuser/'))
            }, 'orderbyuser')
          },
        }, {
          path: 'assignFee',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/assignFee'))
              cb(null, require('./routes/store/assignFee/'))
            }, 'assignFee')
          },
        }, {
          path: 'operatorAssignFee',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/operatorAssignFee'))
              cb(null, require('./routes/store/operatorAssignFee/'))
            }, 'operatorAssignFee')
          },
        }, {
          path: 'storeSign',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/storeSign'))
              cb(null, require('./routes/store/storeSign/'))
            }, 'storeSign')
          },
        }, {
          path: 'selectfenpai',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/selectfenpai'))
              cb(null, require('./routes/store/selectfenpai/'))
            }, 'selectfenpai')
          },
        }, {
          path: 'selectpjjeDetails',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/selectpjjeDetails'))
              cb(null, require('./routes/store/selectpjjeDetails/'))
            }, 'selectpjjeDetails')
          },
        }, {
          path: 'storeSignDetail',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/storeSignDetail'))
              cb(null, require('./routes/store/storeSignDetail/'))
            }, 'storeSignDetail')
          },
        }, {
          path: 'blacklistdetail',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/blacklistdetail'))
              cb(null, require('./routes/store/blacklistdetail/'))
            }, 'blacklistdetail')
          },
        }, {
          path: 'problem',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/store/problem'))
              cb(null, require('./routes/store/problem/'))
            }, 'problem')
          },
        }, {
          path: '*',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
