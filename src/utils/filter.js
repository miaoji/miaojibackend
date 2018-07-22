/**
 * [在查询数据时对过滤数据中的name进行处理]
 * [注:门店select选择器得到的数据是一个字符串拼接,需要切割]
 * @param {object} payload [查询时的所有数据]
 * @return {object}        [处理后的数据]
 */
export function filterStoreSelect(payload) {
  if (payload.name) {
    payload.idUser = payload.name.split('///')[0]
    delete payload.name
    // payload.name = payload.name.split('///')[1]
  }
}
