const APIV1 = '/api/v1'
// const APIV2 = '/api/v2'

let APIV3
// 本地测试
APIV3 = 'http://192.168.231.232:8080'
// 线上
// APIV3 = 'http://app.quandikeji.com:8288'

// 生产环境时api固定为线上url
if (process.env.NODE_ENV !== 'development') {
  APIV3 = 'http://app.quandikeji.com:8288'
}

let APIV4 = 'http://app.quandikeji.com/WeChatService'

module.exports = {
  APIV3,
  name: '妙寄后台管理系统',
  prefix: '妙寄后台',
  footerText: '妙寄 后台 © 2017 圈嘀科技',
  localPrefix: 'miaojipc_',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV3}/quandiExpressSiteManager/signIn`, // 登陆
    userLogout: `${APIV1}/user/logout`, // 登出

    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,

    wxuser: `${APIV3}/quandiExpressSiteManager/received`, // 微信用户明细
    wxusers: `${APIV3}/quandiExpressSiteManager/wechatuser`, // 微信用户

    storeusers: `${APIV3}/quandiExpressSiteManager/store`, // 门店用户

    communications: `${APIV3}/quandiExpressSiteManager/communicationdata`, // 通信数据

    income: `${APIV3}/quandiExpressSiteManager/income`, // 收入
    expend: `${APIV3}/quandiExpressSiteManager/expenditure`, // 支出
    normal: `${APIV3}/quandiExpressSiteManager/regularMail?expresstype=0`, // 普通件
    collect: `${APIV3}/quandiExpressSiteManager/regularMail?expresstype=1`, // 到付件
    collection: `${APIV3}/quandiExpressSiteManager/regularMail?expresstype=2`, // 代收件

    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,

    topups: `${APIV3}/quandiExpressSiteManager/rechargeRecord`, // 充值记录
    withdraws: `${APIV3}/quandiExpressSiteManager/extractionamount`, // 提现记录

    orders: `${APIV3}/quandiExpressSiteManager/waybillStatus`, // 运单管理
    order: `${APIV3}/quandiExpressSiteManager/waybillStatus`,

    // 二维码推广接口
    qr: {
      create: `${APIV4}/api/qr/createQr`,
      all: `${APIV4}/api/qr/getQrAll`,
      show: `${APIV4}/api/selectQrById`,
      update: `${APIV4}/api/qr/modWxQrById`,
      del: `${APIV4}/api/delQrById`,
    },
    // 充值消费接口
    consume: {
      query: `${APIV3}/quandiExpressSiteManager/paymentOrder`, // 分页查询
    },

    // 黑名单接口
    blacklist: {
      all: `${APIV3}/quandiExpressSiteManager/blackList`,
      add: `${APIV3}/quandiExpressSiteManager/insertBlackList`,
      update: `${APIV3}/quandiExpressSiteManager/updateBlackList`,
      showSiteName: `${APIV3}/quandiExpressSiteManager/idUser`,
    },

    // 查询寄件及金额
    mailprice: {
      all: `${APIV3}/quandiExpressSiteManager/mailprice`,
    },
    // 查询门店单号总量
    storeordertotal: {
      all: `${APIV3}/quandiExpressSiteManager/orderSntotal`
    },
    // 查询门店单号上架信息
    storeorderinfo: {
      all: `${APIV3}/quandiExpressSiteManager/sendMail101`
    },
    // 查询门店分配信息
    storeallot: {
      all: `${APIV3}/quandiExpressSiteManager/sendMail103`
    },
    // 单号规则配置
    ordernumber: {
      index: `${APIV3}/quandiExpressSiteManager/selectorderNumber`,
      create: `${APIV3}/quandiExpressSiteManager/insertOrderNumber`,
      update: `${APIV3}/quandiExpressSiteManager/updateOrderNumber`,
      showBrandName: `${APIV3}/quandiExpressSiteManager/selectBrandId`
    },
    // 京东配置 接口
    jd: {
      // 查询单号池剩余单量
      findOrderSheetCount: `${APIV3}/JDService/order/findOrderSheetCount`,
      // 批量填充单号池
      orderSheet: `${APIV3}/JDService/order/orderSheet`,
      // 设置京东分成比例
      setJDConfig: `${APIV3}/JDService/order/setJDConfig`,
      // 获取京东分成比例
      getJDConfig: `${APIV3}/JDService/order/getJDConfig`,
    },
    // 文章上传功能
    publish: {
      // quandiExpressSiteManager/upload
      upload: `${APIV3}/quandiExpressSiteManager/upload`,
      send: `${APIV3}/quandiExpressSiteManager/insertreleaseArticle`
    },
    // 门店支付寄件汇总
    sendtotal: {
      all: `${APIV3}/quandiExpressSiteManager/orderState`
    },
    // 门店到件总量 -- 上架
    selectshelves: {
      all: `${APIV3}/quandiExpressSiteManager/selectshelves`
    },
    // 门店到件总量 -- 分派
    sentalong: {
      all: `${APIV3}/quandiExpressSiteManager/sentAlong`
    }
  }
}
