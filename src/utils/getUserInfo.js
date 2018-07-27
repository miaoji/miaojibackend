import { storage } from './index'
/**
 * [获取用户的机构ID]
 */
const getOrgId = () => {
  let orgId = ''
  try {
    const user = storage({ key: 'user' })
    orgId = user ? JSON.parse(user).orgId : undefined
  } catch (err) {
    console.log(err)
    orgId = undefined
  }
  return orgId
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
    console.log(err)
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
    console.log(err)
    userId = undefined
  }
  return userId
}
/**
 * [查看是否是超级管理员(默认机构ID为1的时候是超级管理员)]
 */
const isSuperAdmin = () => {
  let orgId = ''
  try {
    const user = storage({ key: 'user' })
    orgId = user ? JSON.parse(user).orgId : undefined
  } catch (err) {
    console.log(err)
    orgId = undefined
  }
  return orgId === 1
}

export {
  getOrgId,
  getRoleId,
  getUserId,
  isSuperAdmin,
}
