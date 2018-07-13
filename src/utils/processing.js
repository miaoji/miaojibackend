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

export const handleArrData = ({ list, arr }) => {
  const tmp = []
  list.forEach((item) => {
    const key = item.key
    if (item.children && item.children.length > 0) {
      item.children.forEach((j) => {
        const aa = j.key
        if (arr.indexOf(String(j.key)) >= 0) {
          tmp.push(key.toString())
        }
        if (j.children && j.children.length > 0) {
          j.children.forEach((i) => {
            if (arr.indexOf(String(i.key)) >= 0) {
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
