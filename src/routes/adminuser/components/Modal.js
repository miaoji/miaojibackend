import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Cascader } from 'antd'

const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  orgTree,
  confirmDirty,
  onEditConfirmDirty,
  orangeizeList,
  roleList,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
  },
  type,
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const validateToNextPassword = (_, value, callback) => {
    if (value && confirmDirty) {
      validateFields(['repass'], { force: true })
    }
    callback()
  }

  const compareToFirstPassword = (_, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一致!')
    } else {
      callback()
    }
  }

  const handleConfirmBlur = (e) => {
    const value = e.target.value
    onEditConfirmDirty({ confirmDirty: confirmDirty || !!value })
  }

  const filterOrg = (inputValue, path) => {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1))
  }

  if (type === 'resetPWD') {
    return (
      <Modal {...modalOpts} title="重置密码">
        <Form layout="horizontal">
          <FormItem label="登陆密码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('password', {
              initialValue: item.password,
              rules: [
                {
                  required: true,
                  message: '请填写用户登陆密码!',
                },
                {
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./])[~!@#$%^&*()_+`\-={}:";'<>?,./0-9a-zA-Z\d]{8,30}$/,
                  message: '密码长度要在8~30之间且至少包含一个大写字母一个小写字母一个数字一个特殊符号!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            })(<Input type="password" placeholder="请填写用户登陆密码!" />)}
          </FormItem>
          <FormItem label="确认密码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('repass', {
              initialValue: item.repass,
              rules: [
                {
                  required: true,
                  message: '请填写确认密码!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(<Input type="password" placeholder="请填写确认密码!" onBlur={handleConfirmBlur} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  const initOrgId = Number(item.orgId) || ''

  if (type === 'update') {
    const roleSelect = item.role ? item.role.map(i => String(i.id)) : []
    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="姓名" hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                  message: '请填写用户姓名!',
                },
              ],
            })(<Input placeholder="请填写用户姓名!" />)}
          </FormItem>
          <FormItem label="登陆账号" hasFeedback {...formItemLayout}>
            {getFieldDecorator('accounts', {
              initialValue: item.accounts,
              rules: [
                {
                  pattern: /^[A-Za-z0-9]+$/,
                  message: '账号为字母或者数字或两者的组合!',
                },
                {
                  required: true,
                  message: '请填写用户登陆账号!',
                },
              ],
            })(<Input placeholder="请填写用户登陆账号!" />)}
          </FormItem>
          <FormItem label="所属机构" hasFeedback {...formItemLayout}>
            {getFieldDecorator('orgId', {
              initialValue: initOrgId,
              rules: [
                {
                  required: true,
                  message: '请选择所属机构!',
                },
              ],
            })(<Select placeholder="请选择所属机构!">
              {orangeizeList}
            </Select>)}
          </FormItem>
          <FormItem label="角色信息" hasFeedback {...formItemLayout}>
            {getFieldDecorator('roleId', {
              initialValue: roleSelect,
              rules: [
                {
                  required: true,
                  message: '请输入角色信息!',
                },
              ],
            })(<Select
              showSearch
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请输入站点信息!"
            >
              {roleList}
            </Select>)}
          </FormItem>
          <FormItem label="联系方式" hasFeedback {...formItemLayout}>
            {getFieldDecorator('mobile', {
              initialValue: item.mobile,
              rules: [
                {
                  required: false,
                  message: '请填写联系方式!',
                },
              ],
            })(<Input placeholder="请填写联系方式!" />)}
          </FormItem>
          <FormItem label="备注信息" hasFeedback {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
              rules: [
                {
                  required: false,
                  message: '理由字数不能超过100!',
                  max: 100,
                },
              ],
            })(<TextArea placeholder="请填写相关备注信息!" style={{ height: '50', width: '100%' }} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  if (type === 'create') {
    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <div style={{ height: '0px', overflow: 'hidden' }}>
            {/* 处理autocomplete属性失效不能阻止浏览器自动填充表单 */}
            <FormItem label="处理浏览器表单自动填充" hasFeedback {...formItemLayout}>
              {getFieldDecorator('useless', {
              })(<Input type="password" />)}
            </FormItem>
          </div>
          <FormItem label="姓名" hasFeedback {...formItemLayout}>
            {getFieldDecorator('newName', {
              rules: [
                {
                  required: true,
                  message: '请填写用户姓名!',
                },
              ],
            })(<Input placeholder="请填写用户姓名!" />)}
          </FormItem>
          <FormItem label="登陆账号" hasFeedback {...formItemLayout}>
            {getFieldDecorator('newAccounts', {
              rules: [
                {
                  pattern: /^[A-Za-z0-9]+$/,
                  message: '账号为字母或者数字或两者的组合!',
                },
                {
                  required: true,
                  message: '请填写用户登陆账号!',
                },
              ],
            })(<Input placeholder="请填写用户登陆账号!" />)}
          </FormItem>
          <FormItem label="登陆密码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写用户登陆密码!',
                },
                {
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./])[~!@#$%^&*()_+`\-={}:";'<>?,./0-9a-zA-Z\d]{8,30}$/,
                  message: '密码长度要在8~30之间且至少包含一个大写字母一个小写字母一个数字一个特殊符号!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            })(<Input type="password" placeholder="请填写用户登陆密码!" />)}
          </FormItem>
          <FormItem label="确认密码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('repass', {
              rules: [
                {
                  required: true,
                  message: '请填写确认密码!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(<Input type="password" placeholder="请填写确认密码!" onBlur={handleConfirmBlur} />)}
          </FormItem>
          <FormItem label="所属机构" hasFeedback {...formItemLayout}>
            {getFieldDecorator('orgId', {
              rules: [
                {
                  required: true,
                  message: '请选择所属机构!',
                },
              ],
            })(<Cascader
              options={orgTree}
              placeholder="请选择所属机构"
              showSearch={{ filterOrg }}
              autocomplete="off"
              changeOnSelect
            />)}
          </FormItem>
          <FormItem label="角色信息" hasFeedback {...formItemLayout}>
            {getFieldDecorator('roleId', {
              initialValue: item.roleName,
              rules: [
                {
                  required: true,
                  message: '请输入角色信息!',
                },
              ],
            })(<Select
              showSearch
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请输入站点信息!"
            // onChange={handleChange}
            >
              {roleList}
            </Select>)}
          </FormItem>
          <FormItem label="联系方式" hasFeedback {...formItemLayout}>
            {getFieldDecorator('number', {
              rules: [
                {
                  required: false,
                  message: '请填写联系方式!',
                },
              ],
            })(<Input placeholder="请填写联系方式!" />)}
          </FormItem>
          <FormItem label="备注信息" hasFeedback {...formItemLayout}>
            {getFieldDecorator('remark', {
              rules: [
                {
                  required: false,
                  message: '理由字数不能超过100!',
                  max: 100,
                },
              ],
            })(<TextArea placeholder="请填写相关备注信息!" style={{ height: '50', width: '100%' }} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  return false
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  confirmDirty: PropTypes.bool,
  onEditConfirmDirty: PropTypes.func,
  orangeizeList: PropTypes.array,
  roleList: PropTypes.array,
  orgTree: PropTypes.array,
}

export default Form.create()(modal)