// const APIV2 = '/api/v2'

let APIV1
let APIV3

// 线上
// 旧版
// APIV1 = 'http://app.quandikeji.com:8288'
// 新版
APIV1 = 'http://106.14.212.146:8288/quandiExpressSiteManager'

// APIV1 = 'http://106.14.212.146:8288'

// 山东服务器
// APIV1 = 'http://117.50.23.22:8080'

// 吴聪
// APIV1 = 'http://47.101.42.216:8088'

// 刘思远
// APIV1 = 'http://192.168.126.1:8081'

// 张涛
// APIV1 = 'http://192.168.231.239:8077'

// 石金磊
// APIV1 = 'http://192.168.231.125:80'
// APIV1 = 'http://192.168.231.231/quandiExpressSiteManager'

// 莫畏
// APIV1 = 'http://192.168.231.110:8080'

// 生产环境时api固定为线上url
if (process.env.NODE_ENV !== 'development') {
  APIV1 = 'http://106.14.212.146:8288/quandiExpressSiteManager'
  APIV3 = 'http://106.14.212.146:8288'
}

let APIV4 = 'http://main.mijihome.cn/WeChatService'

module.exports = {
  APIV1,
  APIV3,
  name: '妙寄后台管理系统',
  title: '妙寄后台管理系统',
  prefix: 'antdAdmin',
  localPrefix: 'miaojipc_',
  footerText: '妙寄后台 © 2018 妙寄科技',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: {
      // login: `${APIV1}/signIn`,
      login: `${APIV1}/selectRoleByUserId`,
      getMenus: `${APIV1}/selectRoleByUserId`,
    },
    registerAPP: 'http://main.mijihome.cn:8088/quandiExpressSiteSimple/StationUser/registerStationUser',
    // registerAPP: 'http://192.168.231.131:8080/quandiExpressSiteSimple/StationUser/registerStationUser',
    dashboard: {
      // 获取折线图数据
      echart: `${APIV1}/lineChart`,
      // 获取微信用户数据
      weChatUser: `${APIV1}/homePageWechatUserTotal`,
      // 获取门店总数
      storeTotal: `${APIV1}/selectHomeSiteTotal`,
      // 昨日收入
      income: `${APIV1}/homePageYesterdayInCome`,
      // 获取设备数量
      terminalTotal: `${APIV1}/homePageStoreTotal`,
      // 获取业务量总数
      businessvolumecount: `${APIV1}/getTrafficVolume`,
      // 获取业务量注册记录
      businessRegist: `${APIV1}/stRegist`,
      // 获取业务量操作记录
      businessOperation: `${APIV1}/stOperation`,
    },
    wxuser: {
      list: `${APIV1}/wechatuser`, // 微信用户分页
      getById: `${APIV1}/received`, // 微信用户详细信息(没有的接口)
    },
    storeuser: {
      list: `${APIV1}/store`, // 门店用户
      updateFee: `${APIV1}/updateFee`, // 修改门店用户通讯费
      versionswitch: `${APIV1}/updateVersion`, // app版本切换
    },
    articles: {
      list: `${APIV1}/selectCollection`, // 文章分页数据
      publish: {
        upload: `${APIV1}/upload`, // 图片上传接口
        send: `${APIV1}/insertreleaseArticle`, // 文章发布接口
      },
    },
    storedata: { // 收支数据
      income: {
        list: `${APIV1}/income`, // 收入数据
      },
      expend: {
        list: `${APIV1}/expenditure`, // 支出数据
      },
    },
    wallet: {
      topup: {
        list: `${APIV1}/rechargeRecord`, // 充值记录
      },
      withdraw: {
        list: `${APIV1}/extractionamount`, // 提现记录
        cashWithdraw: `${APIV1}/checkWithdraw`, // 提现审核操作
      },
    },
    order: {
      list: `${APIV1}/waybillStatus`, // 运单管理
      orderInfo: `${APIV1}/waybillStatusInfo`, // 订单详情
    },
    qr: { // 二维码推广接口
      create: `${APIV4}/api/qr/createQr`,
      all: `${APIV4}/api/qr/getQrAll`,
      show: `${APIV4}/api/selectQrById`,
      update: `${APIV4}/api/qr/modWxQrById`,
      del: `${APIV4}/api/delQrById`,
    },
    consume: {
      list: `${APIV1}/paymentOrder`, // 充值消费
    },
    blacklist: {
      all: `${APIV1}/blackList`, // 黑名单
      add: `${APIV1}/insertBlackList`,
      update: `${APIV1}/updateBlackList`,
    },
    // 单号规则配置
    ordernumber: {
      index: `${APIV1}/selectorderNumber`,
      create: `${APIV1}/insertOrderNumber`,
      update: `${APIV1}/updateOrderNumber`,
      showBrandName: `${APIV1}/selectBrandId`,
    },
    // 京东配置 接口
    jd: {
      // 查询单号池剩余单量
      findOrderSheetCount: `${APIV1}/order/findOrderSheetCount`,
      // 批量填充单号池
      orderSheet: `${APIV1}/order/orderSheet`,
      // 设置京东分成比例
      setJDConfig: `${APIV1}/order/setJDConfig`,
      // 获取京东分成比例
      getJDConfig: `${APIV1}/order/getJDConfig`,
    },
    // 黑名单详情
    backlistdetail: {
      all: `${APIV1}/blackListdetails`,
    },
    // 门店支付寄件汇总
    sendtotal: {
      all: `${APIV1}/orderState`,
    },
    // 查询寄件及金额
    mailprice: {
      all: `${APIV1}/mailprice`,
    },
    // 门店寄件金额
    expressfee: {
      all: `${APIV1}/selectStorePrice`,
    },
    // 门店单号汇总
    expressfeedetail: {
      all: `${APIV1}/selectPayType`,
      download: `${APIV1}/selectMailddownload`,
    },
    // 操作人寄件总金额
    storeUserDetail: {
      all: `${APIV1}/selectrealName`,
    },
    // 门店点单上架分派签收
    business: {
      all: `${APIV1}/selectdsfq`,
    },
    // 根据站点名查询站点下操作人寄件汇总
    operatorbyname: {
      all: `${APIV1}/selectRealNamedsfq`,
    },
    // 根据操作人姓名查询门店单号汇总
    orderbyuser: {
      all: `${APIV1}/selectRealNamedsfqDetails`,
    },
    // 门店派件金额
    assignFee: {
      all: `${APIV1}/selectpjjetotal`,
    },
    // 操作人派件金额
    operatorAssignFee: {
      all: `${APIV1}/selectpjjeDetails`,
    },
    // 门店签收信息汇总
    storeSign: {
      all: `${APIV1}/SignRate`,
    },
    // 门店分派
    selectfenpai: {
      all: `${APIV1}/selectfenpai`,
    },
    // 门店分派子页面分派人信息汇总
    assignor: {
      all: `${APIV1}/selectBusiness`,
      expanded: `${APIV1}/selectBrandBusiness`,
    },
    // 门店分派-操作人详情
    selectpjjeDetails: {
      all: `${APIV1}/selectfenpaipDetails`,
    },
    // 异常件页面
    problem: {
      all: `${APIV1}/selectProblemPartsCount`,
      gitBrandByIdUser: `${APIV1}/selectProblemPartsByBrand`,
    },
    // 异常件明细
    problemdetail: {
      all: `${APIV1}/selectproblemParts`,
    },
    // 权限管理
    auth: {
      // 用户管理
      adminuser: {
        list: `${APIV1}/operatorList`,
        update: `${APIV1}/operatorEdit`,
        delete: `${APIV1}/operatorDel`,
        create: `${APIV1}/operatorAdd`,
        // list: `${APIV1}/operatorList`,
        // update: `${APIV1}/operatorEdit`,
        // delete: `${APIV1}/operatorDel`,
        // create: `${APIV1}/operatorAdd`,
      },
      // 菜单管理
      menu: {
        list: `${APIV1}/menuList`,
        update: `${APIV1}/menuEdit`,
        delete: `${APIV1}/menuDel`,
        create: `${APIV1}/menuAdd`,
        getMenuByParentId: `${APIV1}/getMenuByParentId`,
      },
      // 角色管理
      role: {
        list: `${APIV1}/roleList`,
        update: `${APIV1}/roleEdit`,
        delete: `${APIV1}/roleDel`,
        create: `${APIV1}/roleAdd`,
        queryMenu: `${APIV1}/menuList`,
        // list: `${APIV1}/roleList`,
        // update: `${APIV1}/roleEdit`,
        // delete: `${APIV1}/roleDel`,
        // create: `${APIV1}/roleAdd`,
        // queryMenu: `${APIV1}/menuList`,
        // getLocation: `${APIV1}/quandiExpressSiteManager/getLocation`,
      },
      // 机构管理
      org: {
        getLocation: `${APIV1}/getLocation`,
        list: `${APIV1}/orgList`,
        update: `${APIV1}/orgEdit`,
        delete: `${APIV1}/orgDel`,
        create: `${APIV1}/orgAdd`,
        /**
         * 根据地址查询门店
         */
        getIdUsers: `${APIV1}/selectIdUsers`,
      },

    },
    // 业务量
    businessvolume: {
      list: `${APIV1}/getPortfolio`,
      detail: `${APIV1}/getOrderByBrand`,
      count: `${APIV1}/getPortfolioByBrand`,
      downloadExcel: `${APIV1}/downloadPortfolio`,
      downloadDetailExcel: `${APIV1}/downloadBusinessInfo`,
      downloadAllData: `${APIV1}/selectAllBusiness`, // 下载当日权限下所有门店数据(签收,操作,分派,业务量)
    },
    // 品牌统计
    brandcount: {
      list: `${APIV1}/simpleList`,
    },
    // 分派人
    assignment: {
      list: `${APIV1}/assignList`,
    },
    // 业务操作
    businessoperation: {
      list: `${APIV1}/stOperation`,
    },
    // 业务注册
    businessregist: {
      list: `${APIV1}/stRegist`,
    },
    // 环迅账号管理
    bankcard: {
      list: `${APIV1}/selectHxIPS`,
      // update: `${APIV1}/deleteHxIPS`,
      delete: `${APIV1}/deleteHxIPS`,
      create: `${APIV1}/saveHxIPS`,
    },
    // 快递对接状态查询
    docking: {
      list: `${APIV1}/simpleRecordIndex`,
      detail: `${APIV1}/simpleRecordList`,
    },
  },
  brand: {
    2: '优速',
    3: '龙邦',
    4: '速尔',
    5: '快捷',
    6: '全峰',
    7: '百世',
    8: '天天',
    9: '中通',
    11: '申通',
    12: '圆通',
    14: 'EMS',
    15: '国通',
    16: '蚂蚁帮',
    17: '邮政小包',
    18: '宅急送',
    19: '跨越',
    20: '京东',
    21: '达达',
    22: '万象',
    23: '妙寄',
    24: '中铁',
    27: '品骏',
    26: '安能',
    28: '日日顺',
    29: '如风达',
    10: '韵达',
    13: '顺丰',
    71: '高铁快运',
  },
  brandReverse: {
    优速: 2,
    龙邦: 3,
    速尔: 4,
    快捷: 5,
    全峰: 6,
    百世快递: 7,
    百世: 7,
    天天: 8,
    中通: 9,
    申通: 11,
    圆通: 12,
    EMS: 14,
    国通: 15,
    蚂蚁帮: 16,
    邮政小包: 17,
    宅急送: 18,
    跨越: 19,
    京东: 20,
    达达: 21,
    万象: 22,
    妙寄: 23,
    中铁: 24,
    品骏: 27,
    安能: 26,
    日日顺: 28,
    如风达: 29,
    韵达: 10,
    顺丰: 13,
    高铁快运: 71,
    德邦: 1,
  },
  brandArr: [
    { key: 2, name: '优速' },
    { key: 3, name: '龙邦' },
    { key: 4, name: '速尔' },
    { key: 5, name: '全峰' },
    { key: 6, name: '优速' },
    { key: 7, name: '百世' },
    { key: 8, name: '天天' },
    { key: 9, name: '中通' },
    { key: 10, name: '韵达' },
    { key: 11, name: '申通' },
    { key: 12, name: '圆通' },
    { key: 13, name: '顺丰' },
    { key: 14, name: 'EMS' },
    { key: 15, name: '国通' },
    { key: 16, name: '蚂蚁帮' },
    { key: 17, name: '邮政小包' },
    { key: 18, name: '宅急送' },
    { key: 19, name: '跨越' },
    { key: 20, name: '京东' },
    { key: 21, name: '达达' },
    { key: 22, name: '万象' },
    { key: 23, name: '妙寄' },
    { key: 24, name: '中铁' },
    { key: 26, name: '安能' },
    { key: 27, name: '品骏' },
    { key: 28, name: '日日顺' },
    { key: 29, name: '如风达' },
    { key: 71, name: '高铁快运' },
  ],
  orderType: {
    101: '到件',
    102: '上架',
    103: '分派',
    301: '签收',
    302: '退回',
    201: '问题件',
    202: '修改',
  },
  orderTypeForBusiness: {
    1: '点货',
    101: '入库',
    305: '签收',
    304: '补签',
    303: '退回',
  },
}
