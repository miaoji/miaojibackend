const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

/*
 * @mock data
 * subject 主体;
 * income 收入: deliveryCharges 派送费, SendCharges 寄件费, collectCharges 到付, collection 代收, others 其他;
 * expend 支出: communicateCharges 通讯费, withdrawCharges 提现费用, others 其他;
 * balance 余额
 */

let checkbookData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      'subject|1': [
        '康桥老街社区店',
        '地杰三期社区店',
        '康桥宝坻社区店',
        '汇善社区店',
        '板泉路社区店',
        '淞肇路社区店',
        '淞南路社区店',
        '长江路社区店',
        '淞南一村社区店',
        '逸居苑社区店',
        '长宏新苑社区店',
        '万临社区店',
        '金虹桥商圈店',
        '华师大中北校园店',
        '华师大校闵行园店',
        '红梅南路社区店',
        '剑川路社区店',
        '有家社区店',
        '逸仙路社区店',
        '汇福家园社区店',
        '中国烟酒',
        '烟酒商店',
        '永乐万家食品店',
        '烟酒便利店',
        '烟酒商行',
        '烟酒超市',
        '世纪城超市',
        '生活超市',
        '红黄蓝便利店',
        '金玲烟酒超市',
        '平房店',
        '管庄店',
        '朝外店',
        '万柳店',
        '石佛营店',
        '奥运村店',
        '左家庄店',
        '融桥官邸',
        '林景雅园',
        '揽月山庄',
        '熙龙山院',
        '海都嘉园',
        '山潘一村/南化九村',
        '梧桐世家',
        '旭日学府',
        '盘锦花园',
        '莉湖春晓',
        '丰盛凤凰府',
        '南古公寓',
        '芳庭潘园',
        '桂鑫园',
        '旭日爱上城6街区',
        '新桥家园',
        '北外滩水城14街区',
        '盘金华府',
        '天润城14街区',
        '华侨城3期',
        '青岛德顺诚药业连锁有限公司第一分店',
        '青岛德顺诚药业连锁有限公司第二分店',
        '青岛德顺诚药业连锁有限公司第三分店',
        '青岛德顺诚药业连锁有限公司第四分店',
        '青岛德顺诚药业连锁有限公司第五分店',
        '青岛德顺诚药业连锁有限公司第六分店',
        '青岛德顺诚药业连锁有限公司第七分店',
        '青岛德顺诚药业连锁有限公司第八分店',
        '青岛德顺诚药业连锁有限公司第九分店',
        '青岛德顺诚药业连锁有限公司第十一分店',
        '青岛德顺诚药业连锁有限公司第十二分店',
        '青岛德顺诚药业连锁有限公司第十四分店',
        '青岛德顺诚药业连锁有限公司第十五分店',
        '青岛德顺诚药业连锁有限公司第十六分店',
        '青岛德顺诚药业连锁有限公司第十七分店',
        '青岛德顺诚药业连锁有限公司第十八分店',
        '青岛德顺诚药业连锁有限公司第十九分店',
        '青岛德顺诚药业连锁有限公司第二十分店',
        '青岛德顺诚药业连锁有限公司第二十一分店',
        '青岛德顺诚药业连锁有限公司第二十二分店',
        '青岛德顺诚药业连锁有限公司第二十三分店',
        '青岛德顺诚药业连锁有限公司第二十四分店',
        '青岛德顺诚药业连锁有限公司第二十五分店',
        '青岛德顺诚药业连锁有限公司第二十六分店',
        '青岛德顺诚药业连锁有限公司第二十七分店',
        '青岛德顺诚药业连锁有限公司第二十八分店',
        '青岛德顺诚药业连锁有限公司第二十九分店',
        '青岛德顺诚药业连锁有限公司第三十分店',
        '青岛德顺诚药业连锁有限公司第三十一分店',
        '青岛德顺诚药业连锁有限公司第三十二分店',
        '青岛德顺诚药业连锁有限公司第三十三分店',
        '青岛德顺诚药业连锁有限公司第三十四分店',
        '青岛德顺诚药业连锁有限公司第三十五分店',
        '青岛德顺诚药业连锁有限公司第三十六分店',
        '青岛德顺诚药业连锁有限公司第三十七分店',
        '青岛德顺诚药业连锁有限公司第三十八分店',
        '青岛德顺诚药业连锁有限公司第三十九分店',
        '青岛德顺诚药业连锁有限公司第四十六分店',
        '青岛德顺诚药业连锁有限公司第五十二分店',
        '青岛德顺诚药业连锁有限公司第五十五分店',
        '青岛德顺诚药业连锁有限公司第五十六分店',
        '青岛德顺诚药业连锁有限公司第五十七分店',
        '青岛德顺诚药业连锁有限公司第五十八分店',
        '青岛德顺诚药业连锁有限公司第五十九分店',
        '青岛德顺诚药业连锁有限公司第六十分店',
        '青岛德顺诚药业连锁有限公司第六十三分店',
        '青岛德顺诚药业连锁有限公司第六十七分店',
        '青岛德顺诚药业连锁有限公司楼子疃药店',
        '青岛德顺诚药业连锁有限公司温泉药店',
        '青岛德顺诚药业连锁有限公司臧村药店',
        '青岛德顺诚药业连锁有限公司北巉山药店',
        '青岛德顺诚药业连锁有限公司中岔河药店',
        '青岛德顺诚药业连锁有限公司第六十六分店',
        '青岛德顺诚药业连锁有限公司第六十九分店',
      ],
//    income: {
//      'deliveryCharges|0-999': 1,
//      'SendCharges|0-999': 1,
//      'collectCharges|0-999': 1,
//      'collection|0-999': 1,
//      'others|0-999': 1,
//    },
//    expend: {
      'communicateCharges|0-999': 1,
      'withdrawCharges|0-999': 1,
      'others|0-999': 1,
//    },
      'balance|0-999': 1,
      createTime: '@datetime',
    },
  ],
})

let database = checkbookData.data

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`GET ${apiPrefix}/expend`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
}
