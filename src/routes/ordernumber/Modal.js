import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
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
  brandName,
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

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="前缀" hasFeedback {...formItemLayout}>
          {getFieldDecorator('start', {
            initialValue: item.start,
            rules: [
              {
                required: true,
                message: '请输入单号前缀!',
              },
            ],
          })(<Input placeholder="请输入单号前缀!" />)}
        </FormItem>
        <FormItem label="后缀" hasFeedback {...formItemLayout}>
          {getFieldDecorator('end', {
            initialValue: item.end,
            rules: [
              {
                required: true,
                message: '请输入单号后缀!',
              },
            ],
          })(<Input placeholder="请输入单号后缀!" />)}
        </FormItem>
        <FormItem 
          label="单号长度"
          hasFeedback 
          {...formItemLayout}>
          {getFieldDecorator('length', {
            initialValue: item.length,
            rules: [
              {
                required: true,
                message: '单号长度!',
              },
            ],
          })(<InputNumber size="large" placeholder="单号长度!" />)}
        </FormItem>
        <FormItem label="快递品牌" hasFeedback {...formItemLayout}>
          {getFieldDecorator('brand', {
            initialValue: item.brand,
            rules: [
              {
                required: true,
                message: '选择快递品牌!',
              },
            ],
          })(<Select showSearch placeholder="请输入快递品牌" defaultValue="" style={{ width: 286 }}>{brandName}</Select>)}
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
