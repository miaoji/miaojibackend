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
  selectSiteName,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
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

  const paramDisabled = type === 'update'

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="昵称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: !paramDisabled,
                // pattern: /^[0-9a-zA-Z]*$/,
                message: '请填写用户昵称!',
              },
            ],
          })(<Input placeholder="请填写用户昵称!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="登陆账号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: !paramDisabled,
                // pattern: /^[0-9a-zA-Z]*$/,
                message: '请填写用户登陆账号!',
              },
            ],
          })(<Input placeholder="请填写用户登陆账号!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="登陆密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: !paramDisabled,
                // pattern: /^[0-9a-zA-Z]*$/,
                message: '请填写用户登陆密码!',
              },
            ],
          })(<Input placeholder="请填写用户登陆密码!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="确认密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: !paramDisabled,
                // pattern: /^[0-9a-zA-Z]*$/,
                message: '请填写确认密码!',
              },
            ],
          })(<Input placeholder="请填写确认密码!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="角色信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: !paramDisabled,
                // pattern: /^[0-9a-zA-Z]*$/,
                message: '请填写角色!',
              },
            ],
          })(<Input placeholder="请填写角色!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="所属站点" hasFeedback {...formItemLayout}>
          {getFieldDecorator('idUser', {
            initialValue: item.idUser,
            rules: [
              {
                required: !paramDisabled,
                message: '选择站点!',
              },
            ],
          })(<Select showSearch disabled={paramDisabled} placeholder="输入站点名称或者IdUser可搜索" defaultValue="" style={{ width: 286 }}>{selectSiteName}</Select>)}
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

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  selectSiteName: PropTypes.array,
}

export default Form.create()(modal)
