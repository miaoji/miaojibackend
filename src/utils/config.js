const APIV1 = 'http://127.0.0.1:8000/api/v1'
// const APIV2 = '/api/v2'

let APIV3

// 线上
APIV3 = 'http://app.quandikeji.com:8288'

// 本地测试
// 徐景阳
// APIV3 = 'http://192.168.231.232:8080'

// 吴聪
// APIV3 = 'http://47.101.42.216:8088'

// 刘思远
// APIV3 = 'http://192.168.126.1:8081'

// 张涛
// APIV3 = 'http://106.14.212.146:8288'
APIV3 = 'http://192.168.231.239:8066'
// APIV3 = 'http://117.50.23.22:8080'

// 生产环境时api固定为线上url
if (process.env.NODE_ENV !== 'development') {
  APIV3 = 'http://app.quandikeji.com:8288'
  // APIV3 = 'http://47.101.42.216:8088'
  APIV3 = 'http://106.14.212.146:8288'
}

let APIV4 = 'http://app.quandikeji.com/WeChatService'

module.exports = {
  APIV3,
  name: '妙寄后台管理系统',
  prefix: 'antdAdmin',
  localPrefix: 'miaojipc_',
  footerText: '这是一段很简单的底部信息',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: {
      // login: `${APIV3}/quandiExpressSiteManager/signIn`,
      login: `${APIV3}/quandiExpressSiteManager/selectRoleByUserId`,
      getMenus: `${APIV3}/quandiExpressSiteManager/selectRoleByUserId`,
    },
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    user: `${APIV1}/user/:id`,
    dashboard: {
      // 获取折线图数据
      echart: `${APIV3}/quandiExpressSiteManager/lineChart`,
      // 获取微信用户数据
      weChatUser: `${APIV3}/quandiExpressSiteManager/homePageWechatUserTotal`,
      // 获取门店总数
      storeTotal: `${APIV3}/quandiExpressSiteManager/selectHomeSiteTotal`,
      // 昨日收入
      income: `${APIV3}/quandiExpressSiteManager/homePageYesterdayInCome`,
      // 获取设备数量
      terminalTotal: `${APIV3}/quandiExpressSiteManager/homePageStoreTotal`,
    },
    menus: `${APIV1}/menus`,
    wxuser: {
      list: `${APIV3}/quandiExpressSiteManager/wechatuser`, // 微信用户分页
      getById: `${APIV3}/quandiExpressSiteManager/received`, // 微信用户详细信息(没有的接口)
    },
    storeuser: {
      list: `${APIV3}/quandiExpressSiteManager/store`, // 门店用户
      updateFee: `${APIV3}/quandiExpressSiteManager/updateFee`, // 修改门店用户通讯费
      versionswitch: `${APIV3}/quandiExpressSiteManager/updateVersion`, // app版本切换
    },
    articles: {
      list: `${APIV3}/quandiExpressSiteManager/selectCollection`, // 文章分页数据
      publish: {
        upload: `${APIV3}/quandiExpressSiteManager/upload`, // 图片上传接口
        send: `${APIV3}/quandiExpressSiteManager/insertreleaseArticle`, // 文章发布接口
      },
    },
    storedata: { // 收支数据
      income: {
        list: `${APIV3}/quandiExpressSiteManager/income`, // 收入数据
      },
      expend: {
        list: `${APIV3}/quandiExpressSiteManager/expenditure`, // 支出数据
      },
    },
    wallet: {
      topup: {
        list: `${APIV3}/quandiExpressSiteManager/rechargeRecord`, // 充值记录
      },
      withdraw: {
        list: `${APIV3}/quandiExpressSiteManager/extractionamount`, // 提现记录
      },
    },
    order: {
      list: `${APIV3}/quandiExpressSiteManager/waybillStatus`, // 运单管理
    },
    qr: { // 二维码推广接口
      create: `${APIV4}/api/qr/createQr`,
      all: `${APIV4}/api/qr/getQrAll`,
      show: `${APIV4}/api/selectQrById`,
      update: `${APIV4}/api/qr/modWxQrById`,
      del: `${APIV4}/api/delQrById`,
    },
    consume: {
      list: `${APIV3}/quandiExpressSiteManager/paymentOrder`, // 充值消费
    },
    blacklist: {
      all: `${APIV3}/quandiExpressSiteManager/blackList`, // 黑名单
      add: `${APIV3}/quandiExpressSiteManager/insertBlackList`,
      update: `${APIV3}/quandiExpressSiteManager/updateBlackList`,
    },
    // 单号规则配置
    ordernumber: {
      index: `${APIV3}/quandiExpressSiteManager/selectorderNumber`,
      create: `${APIV3}/quandiExpressSiteManager/insertOrderNumber`,
      update: `${APIV3}/quandiExpressSiteManager/updateOrderNumber`,
      showBrandName: `${APIV3}/quandiExpressSiteManager/selectBrandId`,
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
    // 黑名单详情
    backlistdetail: {
      all: `${APIV3}/quandiExpressSiteManager/blackListdetails`,
    },
    // 门店支付寄件汇总
    sendtotal: {
      all: `${APIV3}/quandiExpressSiteManager/orderState`,
    },
    // 查询寄件及金额
    mailprice: {
      all: `${APIV3}/quandiExpressSiteManager/mailprice`,
    },
    // 门店寄件金额
    expressfee: {
      all: `${APIV3}/quandiExpressSiteManager/selectStorePrice`,
    },
    // 门店单号汇总
    expressfeedetail: {
      all: `${APIV3}/quandiExpressSiteManager/selectPayType`,
      download: `${APIV3}/quandiExpressSiteManager/selectMailddownload`,
    },
    // 操作人寄件总金额
    storeUserDetail: {
      all: `${APIV3}/quandiExpressSiteManager/selectrealName`,
    },
    // 操作人寄件详情
    operator: {
      all: `${APIV3}/quandiExpressSiteManager/selectRealNameDetails`,
    },
    // 门店点单上架分派签收
    business: {
      all: `${APIV3}/quandiExpressSiteManager/selectdsfq`,
    },
    // 根据站点名查询站点下操作人寄件汇总
    operatorbyname: {
      all: `${APIV3}/quandiExpressSiteManager/selectRealNamedsfq`,
    },
    // 根据操作人姓名查询门店单号汇总
    orderbyuser: {
      all: `${APIV3}/quandiExpressSiteManager/selectRealNamedsfqDetails`,
    },
    // 门店派件金额
    assignFee: {
      all: `${APIV3}/quandiExpressSiteManager/selectpjjetotal`,
    },
    // 操作人派件金额
    operatorAssignFee: {
      all: `${APIV3}/quandiExpressSiteManager/selectpjjeDetails`,
    },
    // 门店签收信息汇总
    storeSign: {
      all: `${APIV3}/quandiExpressSiteManager/SignRate`,
    },
    // 门店分派
    selectfenpai: {
      all: `${APIV3}/quandiExpressSiteManager/selectfenpai`,
    },
    // 门店分派-操作人详情
    selectpjjeDetails: {
      all: `${APIV3}/quandiExpressSiteManager/selectfenpaipDetails`,
    },
    // 异常件页面
    problem: {
      all: `${APIV3}/quandiExpressSiteManager/selectProblemPartsCount`,
      gitBrandByIdUser: `${APIV3}/quandiExpressSiteManager/selectProblemPartsByBrand`,
    },
    // 异常件明细
    problemdetail: {
      all: `${APIV3}/quandiExpressSiteManager/selectproblemParts`,
    },
    // 权限管理
    auth: {
      // 用户管理
      adminuser: {
        list: `${APIV3}/quandiExpressSiteManager/operatorList`,
        update: `${APIV3}/quandiExpressSiteManager/operatorEdit`,
        delete: `${APIV3}/quandiExpressSiteManager/operatorDel`,
        create: `${APIV3}/quandiExpressSiteManager/operatorAdd`,
        // list: `${APIV1}/operatorList`,
        // update: `${APIV1}/operatorEdit`,
        // delete: `${APIV1}/operatorDel`,
        // create: `${APIV1}/operatorAdd`,
      },
      // 菜单管理
      menu: {
        list: `${APIV3}/quandiExpressSiteManager/menuList`,
        update: `${APIV3}/quandiExpressSiteManager/menuEdit`,
        delete: `${APIV3}/quandiExpressSiteManager/menuDel`,
        create: `${APIV3}/quandiExpressSiteManager/menuAdd`,
        getMenuByParentId: `${APIV3}/quandiExpressSiteManager/getMenuByParentId`,
      },
      // 角色管理
      role: {
        list: `${APIV3}/quandiExpressSiteManager/roleList`,
        update: `${APIV3}/quandiExpressSiteManager/roleEdit`,
        delete: `${APIV3}/quandiExpressSiteManager/roleDel`,
        create: `${APIV3}/quandiExpressSiteManager/roleAdd`,
        queryMenu: `${APIV3}/quandiExpressSiteManager/menuList`,
        // list: `${APIV1}/roleList`,
        // update: `${APIV1}/roleEdit`,
        // delete: `${APIV1}/roleDel`,
        // create: `${APIV1}/roleAdd`,
        // queryMenu: `${APIV1}/menuList`,
        // getLocation: `${APIV1}/quandiExpressSiteManager/getLocation`,
      },
      // 机构管理
      org: {
        getLocation: `${APIV3}/quandiExpressSiteManager/getLocation`,
        list: `${APIV3}/quandiExpressSiteManager/orgList`,
        update: `${APIV3}/quandiExpressSiteManager/orgEdit`,
        delete: `${APIV3}/quandiExpressSiteManager/orgDel`,
        create: `${APIV3}/quandiExpressSiteManager/orgAdd`,
        /**
         * 根据地址查询门店
         */
        getIdUsers: `${APIV3}/quandiExpressSiteManager/selectIdUsers`,
      },
    },
  },
}
