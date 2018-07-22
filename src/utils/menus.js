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
    id: '403',
    bpid: '1',
    mpid: '-1',
    name: '操作人寄件汇总',
    route: '/operator',
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
    id: '409',
    bpid: '1',
    mpid: '4',
    name: '业务量',
    route: '/businessvolume',
  },
  {
    id: '4015',
    bpid: '409',
    mpid: '-1',
    name: '业务量详情',
    route: '/businessvolumeDetail',
  },
  {
    id: '8',
    bpid: '1',
    name: '运单管理',
    icon: 'export',
    route: '/order',
  },
  {
    id: '11',
    bpid: '1',
    name: '黑名单',
    icon: 'code',
    route: '/blacklist',
  },
]
