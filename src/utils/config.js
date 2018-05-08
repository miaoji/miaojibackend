const APIV1 = '/api/v1'
// const APIV2 = '/api/v2'

let APIV3
// 本地测试
// 徐景阳
// APIV3 = 'http://192.168.231.232:8080'
// 吴聪
// APIV3 = 'http://192.168.231.231:8080'
// 线上
APIV3 = 'http://app.quandikeji.com:8288'

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

    storeusers: {
      all: `${APIV3}/quandiExpressSiteManager/store`, // 门店用户
      list: `${APIV3}/quandiExpressSiteManager/stName`, // 获取门店列表信息
    },

    communications: `${APIV3}/quandiExpressSiteManager/communicationdata`, // 通信数据

    income: `${APIV3}/quandiExpressSiteManager/income`, // 收入
    expend: `${APIV3}/quandiExpressSiteManager/expenditure`, // 支出
    normal: `${APIV3}/quandiExpressSiteManager/regularMail?expresstype=0`, // 普通件
    collect: `${APIV3}/quandiExpressSiteManager/regularMail?expresstype=1`, // 到付件
    collection: `${APIV3}/quandiExpressSiteManager/regularMail?expresstype=2`, // 代收件

    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: {
      // 获取首页的本地数据
      all: `${APIV1}/dashboard`,
      // 获取折线图数据
      echart: `${APIV3}/quandiExpressSiteManager/lineChart`,
      // 获取微信用户数据
      weChatUser: `${APIV3}/quandiExpressSiteManager/homePageWechatUserTotal`,
      // 获取门店总数
      storeTotal: `${APIV3}/quandiExpressSiteManager/homePageStoreTotal`,
      // 昨日收入
      income: `${APIV3}/quandiExpressSiteManager/lineChart`,
    },

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
    // 查询寄件及金额
    mailprice: {
      all: `${APIV3}/quandiExpressSiteManager/mailprice`,
    },

    // 门店到件总量 -- 上架
    selectshelves: {
      // all: `${APIV3}/quandiExpressSiteManager/selectshelves` 废除的接口地址
      all: `${APIV3}/quandiExpressSiteManager/noSign`
    },
    // 门店到件总量 -- 分派
    sentalong: {
      // all: `${APIV3}/quandiExpressSiteManager/sentAlong` 废除的接口地址
      all: `${APIV3}/quandiExpressSiteManager/selectSendMail`
    },
    // 门店订单汇总
    storeordertotal: {
      // all: `${APIV3}/quandiExpressSiteManager/orderSntotal` 废弃的接口地址
      all: `${APIV3}/quandiExpressSiteManager/sendddMail`
    },
    // 查询门店派件及金额
    storeorderinfo: {
      // all: `${APIV3}/quandiExpressSiteManager/sendMail101` 废弃的接口地址
      all: `${APIV3}/quandiExpressSiteManager/sendddMailprice`
    },
    // 查询门店分配信息
    storeallot: {
      // all: `${APIV3}/quandiExpressSiteManager/sendMail103` 废弃的接口地址
    },
    // 门店寄件金额
    expressfee: {
      all: `${APIV3}/quandiExpressSiteManager/selectStorePrice`
    },
    // 门店单号汇总
    expressfeedetail: {
      all: `${APIV3}/quandiExpressSiteManager/selectPayType`
    },
    // 操作人寄件总金额
    storeUserDetail: {
      all: `${APIV3}/quandiExpressSiteManager/selectrealName`
    },
    // 操作人寄件详情
    operator: {
      all: `${APIV3}/quandiExpressSiteManager/selectRealNameDetails`
    },
    // 门店点单上架分派签收
    business: {
      all: `${APIV3}/quandiExpressSiteManager/selectdsfq`
    },
    // 根据站点名查询站点下操作人寄件汇总
    operatorbyname: {
      all: `${APIV3}/quandiExpressSiteManager/selectRealNamedsfq`
    },
    // 根据操作人姓名查询门店单号汇总
    orderbyuser: {
      all: `${APIV3}/quandiExpressSiteManager/selectRealNamedsfqDetails`
    },
    // 门店派件金额
    assignFee: {
      all: `${APIV3}/quandiExpressSiteManager/selectpjjetotal`
    },
    // 操作人派件金额
    operatorAssignFee: {
      all: `${APIV3}/quandiExpressSiteManager/selectpjjeDetails`
    },
    // 门店签收信息汇总
    storeSign: {
      all: `${APIV3}/quandiExpressSiteManager/SignRate`
    },
    // 门店分派
    selectfenpai: {
      all: `${APIV3}/quandiExpressSiteManager/selectfenpai`
    },
    // 门店分派-操作人详情
    selectpjjeDetails: {
      all: `${APIV3}/quandiExpressSiteManager/selectfenpaipDetails`
    },
    // 黑名单详情
    backlistdetail: {
      all: `${APIV3}/quandiExpressSiteManager/blackListdetails`
    }
  }
}
