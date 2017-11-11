import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from '../../utils/city'

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

  const paramDisabled = type === 'update'

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="用户ID" hasFeedback {...formItemLayout}>
          {getFieldDecorator('idUser', {
            initialValue: item.idUser,
            rules: [
              {
                required: true,
                message: '请输入黑名单用户Id!',
                max: 100
              }
            ],
          })(<Input type="text" placeholder="请输入黑名单用户Id" />)}
        </FormItem>
        <FormItem label="手机号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: true,
                pattern: /^[A-Za-z0-9]{0,}$/,
                message: '请输入手机号!'
              }
            ],
          })(<Input disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="理由" hasFeedback {...formItemLayout}>
          {getFieldDecorator('note', {
            initialValue: item.note,
            rules: [
              {
                required: true,
                message: '备注字数不能超过100!',
                max: 100
              }
            ]
          })(<TextArea style={{height:'50',width:'100%'}}/>)}
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
