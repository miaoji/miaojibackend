import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'

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
  confirmDirty,
  onEditConfirmDirty,
  orangeizeList,
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

  if (type === 'update') {
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
                  required: true,
                  message: '请填写用户登陆账号!',
                },
              ],
            })(<Input placeholder="请填写用户登陆账号!" />)}
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
          <FormItem label="姓名" hasFeedback {...formItemLayout}>
            {getFieldDecorator('username', {
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
              rules: [
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
            {getFieldDecorator('orangeize', {
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
}

export default Form.create()(modal)
