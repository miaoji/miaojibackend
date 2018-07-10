import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

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

  // const paramDisabled = type === 'update'
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="菜单名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('menuName', {
            initialValue: item.menuName,
            rules: [
              {
                required: true,
                message: '请输入菜单名称!',
              },
            ],
          })(<Input placeholder="请输入菜单名称!" />)}
        </FormItem>
        <FormItem label="MPID" hasFeedback {...formItemLayout}>
          {getFieldDecorator('parentMenuId', {
            initialValue: item.parentMenuId,
            rules: [
              {
                required: true,
                pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入MPID!',
              },
            ],
          })(<Input placeholder="请输入MPID!" />)}
        </FormItem>
        <FormItem label="BPID" hasFeedback {...formItemLayout}>
          {getFieldDecorator('bpid', {
            initialValue: item.bpid,
            rules: [
              {
                required: true,
                pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入BPID!',
              },
            ],
          })(<Input placeholder="请输入BPID!" />)}
        </FormItem>
        <FormItem label="ICON" hasFeedback {...formItemLayout}>
          {getFieldDecorator('icon', {
            initialValue: item.icon,
            rules: [
              {
                required: true,
                pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入ICON!',
              },
            ],
          })(<Input placeholder="请输入ICON!" />)}
        </FormItem>
        <FormItem label="路由地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('target', {
            initialValue: item.target,
            rules: [
              {
                required: true,
                message: '请输入路由地址!',
              },
            ],
          })(<Input placeholder="请输入路由地址!" />)}
        </FormItem>
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('menuDesc', {
            initialValue: item.menuDesc,
            rules: [
              {
                required: true,
                pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入排序!',
              },
            ],
          })(<Input placeholder="请输入排序!" />)}
        </FormItem>
        <FormItem label="备注信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: true,
                message: '字数不能超过100!',
                max: 100,
              },
            ],
          })(<TextArea placeholder="请输入备注信息!" style={{ height: '50', width: '100%' }} />)}
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
}

export default Form.create()(modal)
