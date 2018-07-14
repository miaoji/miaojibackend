/* 用于调整权限管理>角色管理的添加和修改获取菜单列表的数据结构与项目所需字段不匹配的问题 */
export const reloadItem = (item) => {
  if (item.children && item.children.length === 0) {
    delete item.children
  }
  if (item.children && item.children.length > 0) {
    item.children = item.children.map((items) => {
      return reloadItem(items)
    })
  }
  return {
    title: item.menuName,
    key: item.id,
    children: item.children,
  }
}

/* 用于调整权限管理>角色管理的添加和修改中tree无法识别节点树父级ID的问题 */
export const handleArrData = ({ list, arr }) => {
  const tmp = []
  list.forEach((item) => {
    const key = item.key
    if (item.children && item.children.length > 0) {
      item.children.forEach((j) => {
        const aa = j.key
        if (arr.includes(String(j.key))) {
          tmp.push(key.toString())
        }
        if (j.children && j.children.length > 0) {
          j.children.forEach((i) => {
            if (arr.includes(String(i.key))) {
              tmp.push(key.toString())
              tmp.push(aa.toString())
            }
          })
        }
      })
    }
  })
  const tmpArr = Array.from(new Set([...tmp, ...arr]))
  return tmpArr.map((item) => {
    return Number(item)
  })
}
