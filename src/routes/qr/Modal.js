import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'

const FormItem = Form.Item

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
  parameterOption,
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
  if (type === 'create') {
    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="站点" hasFeedback {...formItemLayout}>
            {getFieldDecorator('parameter', {
              initialValue: item.parameter,
              rules: [
                {
                  required: true,
                  message: '请选择站点',
                },
              ],
            })(<Select placeholder="请选择站点" style={{ width: '100%' }} showSearch disabled={paramDisabled} >{parameterOption}</Select>)}
          </FormItem>
          <FormItem label="备注" hasFeedback {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
              rules: [
                {
                  required: false,
                  message: '备注字数不能超过100!',
                  max: 100,
                },
              ],
            })(<Input placeholder="请输入备注信息" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="门店名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '请输入门店名!',
                max: 100,
              },
            ],
          })(<Input type="text" placeholder="请输入门店名" />)}
        </FormItem>
        <FormItem label="站点ID" hasFeedback {...formItemLayout}>
          {getFieldDecorator('parameter', {
            initialValue: item.parameter,
            rules: [
              {
                required: true,
                pattern: /^[A-Za-z0-9]{0,}$/,
                message: '请输入站点ID!',
              },
            ],
          })(<Input disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [
              {
                required: false,
                message: '备注字数不能超过100!',
                max: 100,
              },
            ],
          })(<Input placeholder="请输入备注信息" />)}
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
  parameterOption: PropTypes.array,
}

export default Form.create()(modal)
