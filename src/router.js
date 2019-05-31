import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'
import App from './routes/app'

const Root = (props) => {
  return (
    <LocaleProvider locale={zhCN}>
      <App {...props} />
    </LocaleProvider>
  )
}

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: Root,
      // 默认渲染首页
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./routes/dashboard/model'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          // 登陆页
          path: 'login',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/login/model'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        },
        {
          // 首页
          path: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/dashboard/model'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        },
        {
          // 门店用户
          path: 'storeuser',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/storeuser/model'))
              cb(null, require('./routes/storeuser/'))
            }, 'storeuser')
          },
        },
        {
          // 微信用户页面
          path: 'wxuser',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/wxuser/model'))
              cb(null, require('./routes/wxuser/'))
            }, 'wxuser')
          },
        },
        {
          // 微信用户页面子页
          path: 'wxuserdetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/details/wxuserdetail'))
              cb(null, require('./routes/wxuserdetail/'))
            }, 'wxuser-detail')
          },
        },
        {
          // 文章管理>发布列表
          path: 'articles',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/articles/model'))
              cb(null, require('./routes/articles/'))
            }, 'articles')
          },
        },
        {
          // 文章管理>文章发布
          path: 'publish',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/publish/model'))
              cb(null, require('./routes/publish/'))
            }, 'publish')
          },
        },
        {
          // 钱包管理>充值记录
          path: 'topup',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/wallet/topup'))
              cb(null, require('./routes/topup/'))
            }, 'topup')
          },
        },
        {
          // 钱包管理>提现记录
          path: 'withdraw',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/wallet/withdraw'))
              cb(null, require('./routes/withdraw/'))
            }, 'withdraw')
          },
        },
        {
          // 运单管理
          path: 'order',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/orderdetails'))
              cb(null, require('./routes/orderdetails/'))
            }, 'orderdetails')
          },
        },
        {
          // 推广管理
          path: 'qr',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/qr/model'))
              cb(null, require('./routes/qr/'))
            }, 'qr')
          },
        },
        {
          // 二维码图片
          path: 'qrdetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/details/qrdetail'))
              cb(null, require('./routes/qrdetail/'))
            }, 'qrdetail')
          },
        },
        {
          // 充值消费
          path: 'consume',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/consume'))
              cb(null, require('./routes/consume/'))
            }, 'consume')
          },
        },
        {
          // 黑名单
          path: 'blacklist',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/blacklist'))
              cb(null, require('./routes/blacklist/'))
            }, 'blacklist')
          },
        },
        {
          // 京东单号管理
          path: 'jd',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/jd'))
              cb(null, require('./routes/jd/'))
            }, 'jd')
          },
        },
        {
          // 单号规则配置
          path: 'ordernumber',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/ordernumber/model'))
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
              cb(null, require('./routes/storeuserdetail/'))
            }, 'storeuser-detail')
          },
        },
        {
          // 门店寄件金额
          path: 'expressfee',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/expressfee'))
              cb(null, require('./routes/expressfee/'))
            }, 'expressfee')
          },
        },
        {
          // 门店寄件金额>门店单号汇总
          path: 'expressfeedetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/expressfeedetail'))
              cb(null, require('./routes/expressfeedetail/'))
            }, 'expressfeedetail')
          },
        },
        {
          // 门店操作
          path: 'business',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/business'))
              cb(null, require('./routes/business/'))
            }, 'business')
          },
        },
        {
          // 门店操作>操作人
          path: 'operatorbyname',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/operatorbyname'))
              cb(null, require('./routes/operatorbyname/'))
            }, 'operatorbyname')
          },
        },
        {
          // 门店操作>操作人>快件详情
          path: 'orderbyuser',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/orderbyuser'))
              cb(null, require('./routes/orderbyuser/'))
            }, 'orderbyuser')
          },
        },
        {
          // 门店签收
          path: 'storeSign',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/storeSign'))
              cb(null, require('./routes/storeSign/'))
            }, 'storeSign')
          },
        },
        {
          // 门店签收>签收订单详情
          path: 'storeSignDetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/storeSignDetail'))
              cb(null, require('./routes/storeSignDetail/'))
            }, 'storeSignDetail')
          },
        },
        {
          // 门店分派
          path: 'selectfenpai',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/selectfenpai'))
              cb(null, require('./routes/selectfenpai/'))
            }, 'selectfenpai')
          },
        },
        {
          // 门店分派-操作人数据
          path: 'assignor',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/assignor'))
              cb(null, require('./routes/assignor/'))
            }, 'assignor')
          },
        },
        {
          // 门店分派>操作人分派详情
          path: 'selectpjjeDetails',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/selectpjjeDetails'))
              cb(null, require('./routes/selectpjjeDetails/'))
            }, 'selectpjjeDetails')
          },
        },
        {
          // 门店问题件
          path: 'problem',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/problem'))
              cb(null, require('./routes/problem/'))
            }, 'problem')
          },
        },
        {
          // 门店问题件明细(子页)
          path: 'problemdetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/problemdetail'))
              cb(null, require('./routes/problemdetail/'))
            }, 'problemdetail')
          },
        },
        {
          // 黑名单订单详情
          path: 'blacklistdetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/store/blacklistdetail'))
              cb(null, require('./routes/blacklistdetail/'))
            }, 'blacklistdetail')
          },
        },
        {
          // 权限管理>用户管理
          path: 'adminuser',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/adminuser/model'))
              cb(null, require('./routes/adminuser/'))
            }, 'adminuser')
          },
        },
        {
          // 权限管理>角色管理
          path: 'role',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/role/model'))
              cb(null, require('./routes/role/'))
            }, 'role')
          },
        },
        {
          // 权限管理>菜单管理
          path: 'menu',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/menu/model'))
              cb(null, require('./routes/menu/'))
            }, 'menu')
          },
        },
        {
          // 权限管理>机构管理
          path: 'org',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/org/model'))
              cb(null, require('./routes/org/'))
            }, 'org')
          },
        },
        {
          // 业务量 报表
          path: 'businessvolume',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/businessvolume'))
              cb(null, require('./routes/businessvolume'))
            }, 'businessvolume')
          },
        },
        {
          // 业务量 报表 详情
          path: 'businessvolumeDetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/details/businessvolume'))
              cb(null, require('./routes/businessvolumedetail/'))
            }, 'businessvolume-detail')
          },
        },
        {
          // 品牌统计
          path: 'brandcount',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/brandcount'))
              cb(null, require('./routes/brandcount/'))
            }, 'brandcount')
          },
        },
        {
          // 分派人
          path: 'assignment',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/assignment'))
              cb(null, require('./routes/assignment/'))
            }, 'assignment')
          },
        },
        {
          // 业务操作
          path: 'businessoperation',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/businessoperation'))
              cb(null, require('./routes/businessoperation/'))
            }, 'businessoperation')
          },
        },
        {
          // 业务操作
          path: 'businessregist',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/businessregist'))
              cb(null, require('./routes/businessregist/'))
            }, 'businessregist')
          },
        },
        {
          // 银行卡信息
          path: 'bankcard',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/bankcard'))
              cb(null, require('./routes/bankcard/'))
            }, 'bankcard')
          },
        },
        {
          // 对接管理>品牌对接
          path: 'branddocking',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/branddocking'))
              cb(null, require('./routes/branddocking/'))
            }, 'branddocking')
          },
        },
        {
          // 对接管理>快递对接
          path: 'docking',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/docking'))
              cb(null, require('./routes/docking/'))
            }, 'docking')
          },
        },
        {
          // 快递对接-明细
          path: 'dockingdetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/details/dockingdetail'))
              cb(null, require('./routes/dockingdetail/'))
            }, 'dockingdetail')
          },
        },
        {
          // 审计-日志
          path: 'log',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/log/model'))
              cb(null, require('./routes/log/'))
            }, 'log')
          },
        },
        {
          // 短信状态查询
          path: 'messagearrive',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/messagearrive/model'))
              cb(null, require('./routes/messagearrive/'))
            }, 'messagearrive')
          },
        },
        {
          // 短信状态查询-明细
          path: 'messagearrivedetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/messagearrivedetail/model'))
              cb(null, require('./routes/messagearrivedetail/'))
            }, 'messagearrivedetail')
          },
        },
        {
          // 通讯费账单报表
          path: 'communicationbill',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/communicationbill/model'))
              cb(null, require('./routes/communicationbill/'))
            }, 'communicationbill')
          },
        },
        {
          // 通讯费账单报表-明细
          path: 'communicationbilldetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./routes/communicationbilldetail/model'))
              cb(null, require('./routes/communicationbilldetail/'))
            }, 'communicationbilldetail')
          },
        },
        {
          path: '*',
          // 没有路由匹配的页面 渲染404
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
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
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
}

export default Routers
