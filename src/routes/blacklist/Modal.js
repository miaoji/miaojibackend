import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'

const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    sm: 6,
    xs: {
      span: 24,
    },
  },
  wrapperCol: {
    sm: 14,
    xs: {
      span: 24,
    },
  },
}

const modal = ({
  item = {},
  onOk,
  storeuserList,
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
        <FormItem label="站点名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('idUser', {
            initialValue: item.idUser,
            rules: [
              {
                required: !paramDisabled,
                message: '选择站点!',
              },
            ],
          })(<Select showSearch disabled={paramDisabled} placeholder="输入站点名称或者IdUser可搜索" defaultValue="" style={{ width: '100%' }}>{storeuserList}</Select>)}
        </FormItem>
        <FormItem label="手机号/单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: !paramDisabled,
                pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入手机号码/单号!',
              },
            ],
          })(<Input placeholder="请输入手机号码/单号!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="理由" hasFeedback {...formItemLayout}>
          {getFieldDecorator('note', {
            initialValue: item.note,
            rules: [
              {
                required: true,
                message: '理由字数不能超过100!',
                max: 100,
              },
            ],
          })(<TextArea placeholder="请输入设置理由!" style={{ height: '50', width: '100%' }} />)}
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
  storeuserList: PropTypes.array,
}

export default Form.create()(modal)
