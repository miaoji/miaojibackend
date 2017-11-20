import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select } from 'antd'
import city from '../../utils/city'

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
        <FormItem label="用户ID" hasFeedback {...formItemLayout}>
          {getFieldDecorator('idUser', {
            initialValue: item.idUser,
            rules: [
              {
                required: !paramDisabled,
                message: '选择站点!',
              }
            ],
          })(<Select showSearch disabled={paramDisabled} placeholder='输入站点名称或者IdUser可搜索' defaultValue="" style={{ width: 286 }}>{ selectSiteName }</Select>)}
        </FormItem>
        <FormItem label="手机号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: !paramDisabled,
                pattern: /^[0-9]{11}$/,
                message: '请输入手机号码!'
              }
            ],
          })(<Input placeholder="请输入手机号码!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="理由" hasFeedback {...formItemLayout}>
          {getFieldDecorator('note', {
            initialValue: item.note,
            rules: [
              {
                required: true,
                message: '理由字数不能超过100!',
                max: 100
              }
            ]
          })(<TextArea placeholder="请输入设置理由!" style={{height:'50',width:'100%'}}/>)}
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
