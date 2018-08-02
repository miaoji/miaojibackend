export default [
  {
    id: '1',
    icon: 'laptop',
    name: '首页',
    route: '/dashboard',
  },
  {
    id: '101',
    mpid: '-1',
    icon: 'laptop',
    name: '首页',
    route: '/',
  },
  {
    id: '2',
    bpid: '1',
    name: '权限管理',
    icon: 'shop',
  },
  {
    id: '201',
    mpid: '2',
    bpid: '1',
    name: '用户管理',
    route: '/adminuser',
  },
  {
    id: '204',
    mpid: '2',
    bpid: '1',
    name: '机构管理',
    route: '/org',
  },
  {
    id: '202',
    mpid: '2',
    bpid: '1',
    name: '角色管理',
    route: '/role',
  },
  {
    id: '203',
    mpid: '2',
    bpid: '1',
    name: '菜单管理',
    route: '/menu',
  },
  {
    id: '3',
    bpid: '1',
    name: '微信用户',
    icon: 'message',
    route: '/wxuser',
  },
  {
    id: '301',
    bpid: '1',
    mpid: '-1',
    name: '微信用户',
    icon: 'message',
    route: '/wxuserdetail',
  },
  {
    id: '4',
    bpid: '1',
    name: '门店管理',
    icon: 'shop',
  },
  {
    id: '401',
    bpid: '1',
    mpid: '4',
    name: '门店用户',
    route: '/storeuser',
  },
  {
    id: '402',
    bpid: '1',
    mpid: '-1',
    name: '门店操作人详情',
    route: '/storeuserDetail',
  },
  {
    id: '404',
    bpid: '1',
    mpid: '4',
    name: '门店寄件',
    route: '/expressfee',
  },
  {
    id: '405',
    bpid: '404',
    mpid: '-1',
    name: '门店单号汇总',
    route: '/expressfeedetail',
  },
  {
    id: '406',
    bpid: '1',
    mpid: '4',
    name: '门店操作',
    route: '/business',
  },
  {
    id: '407',
    bpid: '406',
    mpid: '-1',
    name: '操作人',
    route: '/operatorbyname',
  },
  {
    id: '408',
    bpid: '407',
    mpid: '-1',
    name: '快件详情',
    route: '/orderbyuser',
  },
  {
    id: '4011',
    bpid: '1',
    mpid: '4',
    name: '门店签收',
    route: '/storeSign',
  },
  {
    id: '4012',
    bpid: '4011',
    mpid: '-1',
    name: '签收订单详情',
    route: '/storeSignDetail',
  },
  {
    id: '4013',
    bpid: '1',
    mpid: '4',
    name: '门店分派',
    route: '/selectfenpai',
  },
  {
    id: '4014',
    bpid: '4013',
    mpid: '-1',
    name: '操作人分派详情',
    route: '/selectpjjeDetails',
  },
  {
    id: '4015',
    bpid: '1',
    mpid: '4',
    name: '门店问题件',
    route: '/problem',
  },
  {
    id: '4016',
    bpid: '4015',
    mpid: '-1',
    name: '门店问题件明细',
    route: '/problemdetail',
  },
  {
    id: '409',
    bpid: '1',
    mpid: '4',
    name: '业务量',
    route: '/businessvolume',
  },
  {
    id: '4017',
    bpid: '409',
    mpid: '-1',
    name: '业务量详情',
    route: '/businessvolumeDetail',
  },
  // //
  {
    id: '7',
    bpid: '1',
    name: '钱包管理',
    icon: 'wallet',
    route: '/articles',
  },
  {
    id: '701',
    mpid: '7',
    bpid: '7',
    name: '充值记录',
    route: '/topup',
  },
  {
    id: '702',
    mpid: '7',
    bpid: '7',
    name: '提现记录',
    route: '/withdraw',
  },
  {
    id: '8',
    bpid: '1',
    name: '运单管理',
    icon: 'export',
    route: '/order',
  },
  {
    id: '9',
    bpid: '1',
    name: '推广管理',
    icon: 'global',
    route: '/qr',
  },
  {
    id: '901',
    bpid: '9',
    mpid: '-1',
    name: '二维码图片',
    route: '/qrdetail',
  },
  {
    id: '11',
    bpid: '1',
    name: '黑名单',
    icon: 'code',
    route: '/blacklist',
  },
  {
    id: '13',
    bpid: '1',
    name: '京东单号管理',
    icon: 'export',
    route: '/jd',
  },
  {
    id: '14',
    bpid: '1',
    name: '单号规则配置',
    icon: 'setting',
    route: '/ordernumber',
  },
  {
    id: '6',
    bpid: '1',
    name: '推送消息',
    icon: 'edit',
  },
  {
    id: '601',
    mpid: '6',
    bpid: '6',
    name: '文章管理',
    route: '/articles',
  },
  {
    id: '602',
    mpid: '6',
    bpid: '6',
    name: '发布消息',
    route: '/publish',
  },
]
