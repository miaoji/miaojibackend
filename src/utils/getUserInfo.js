import { storage } from './storage'
/**
 * [获取用户的机构ID]
 */
const getOrgId = () => {
  let orgId = ''
  try {
    const user = storage({ key: 'user' })
    orgId = user ? JSON.parse(user).orgId : undefined
    console.log('user', user)
    if (orgId === '0') {
      orgId = undefined
    }
  } catch (err) {
    console.info(err)
    orgId = undefined
  }
  return orgId
}
/**
 * [获取用户所属区域信息]
 */
const getLocation = () => {
  let userLocation = []
  try {
    let user = storage({ key: 'user' })
    user = user ? JSON.parse(user) : undefined
    if (user && user.location) {
      userLocation = user.location.split(',')
      if (!userLocation[0]) {
        userLocation = []
      }
      if (userLocation[2]) {
        userLocation[2] = userLocation[2].split('///')[0]
      }
    }
  } catch (err) {
    console.info(err)
    userLocation = []
  }
  return userLocation
}
/**
 * [获取用户查询范围]
 */
const getOrgIdUsers = () => {
  let idUser = ''
  try {
    let user = storage({ key: 'user' })
    user = user ? JSON.parse(user) : undefined
    if (user && user.idUsers) {
      idUser = user.idUsers
    }
  } catch (err) {
    console.info(err)
    idUser = ''
  }
  return idUser || undefined
}
/**
 * [获取用户的角色ID]
 */
const getRoleId = () => {
  let roleId = ''
  try {
    const user = storage({ key: 'user' })
    roleId = user ? JSON.parse(user).roleId : undefined
  } catch (err) {
    console.info(err)
    roleId = undefined
  }
  return roleId
}
/**
 * [获取用户的ID]
 */
const getUserId = () => {
  let userId = ''
  try {
    const user = storage({ key: 'user' })
    userId = user ? JSON.parse(user).userId : undefined
  } catch (err) {
    console.info(err)
    userId = undefined
  }
  return userId
}
/**
 * [查看是否是超级管理员(默认机构ID为1的时候是超级管理员)]
 */
const isSuperAdmin = () => {
  let roleIds = []
  let user = {}
  try {
    user = storage({ key: 'user' })
    roleIds = user ? JSON.parse(user).roleIds : undefined
  } catch (_) {
    roleIds = undefined
  }
  return roleIds.some(item => Number(item) === 1)
}

export {
  getOrgId,
  getRoleId,
  getUserId,
  isSuperAdmin,
  getLocation,
  getOrgIdUsers,
}
