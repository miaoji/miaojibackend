import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal, Select } from 'antd'

const FormItem = Form.Item

const Option = Select.Option

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
                // required: true,
                message: '请输入单号后缀!',
              },
            ],
          })(<Input placeholder="请输入单号后缀!" />)}
        </FormItem>
        <FormItem label="单号长度" hasFeedback {...formItemLayout}>
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
                message: '请选择快递品牌!',
              },
            ],
          })(<Select showSearch placeholder="请选择快递品牌!" defaultValue="" style={{ width: 286 }}>{brandName}</Select>)}
        </FormItem>
        <FormItem label="快递类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mailType', {
            initialValue: item.mailType,
            rules: [
              {
                required: true,
                message: '请输选择快递类型!',
              },
            ],
          })(<Select placeholder="请输选择快递类型!" style={{ width: 286 }}>
            <Option value={3}>通用(默认)</Option>
            <Option value={0}>普通件</Option>
            <Option value={1}>到付件</Option>
            <Option value={2}>代收货款</Option>
          </Select>)}
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
  brandName: PropTypes.array,
}

export default Form.create()(modal)
