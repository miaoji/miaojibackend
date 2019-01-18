import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Radio } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group

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
        <FormItem label="站点" hasFeedback {...formItemLayout}>
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
        <FormItem label="商户编号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('customerCode', {
            initialValue: item.customerCode,
            rules: [
              {
                required: !paramDisabled,
                pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入商户编号!',
              },
            ],
          })(<Input placeholder="请输入商户编号!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="登录名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('loginName', {
            initialValue: item.loginName,
            rules: [
              {
                required: !paramDisabled,
                // pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入登录名!',
              },
            ],
          })(<Input placeholder="请输入登录名!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="环迅认证人姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hxName', {
            initialValue: item.hxName,
            rules: [
              {
                required: !paramDisabled,
                // pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入环迅认证人姓名!',
              },
            ],
          })(<Input placeholder="请输入环迅认证人姓名!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="证件类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('idType', {
            initialValue: item.idType || '身份证',
            rules: [
              {
                required: !paramDisabled,
                // pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入证件类型!',
              },
            ],
          })(<Input placeholder="请输入证件类型!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="证件号码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('idNumber', {
            initialValue: item.idNumber,
            rules: [
              {
                required: !paramDisabled,
                pattern: /^[0-9a-zA-Z]{18}$/,
                message: '请输入有效证件号码!',
              },
            ],
          })(<Input placeholder="请输入证件号码!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="环迅手机号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hxMobile', {
            initialValue: item.hxMobile,
            rules: [
              {
                required: !paramDisabled,
                pattern: /^[0-9a-zA-Z]{11}$/,
                message: '请输入有效环迅手机号!',
              },
            ],
          })(<Input placeholder="请输入环迅手机号!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="专有用户" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hxSpecialUse', {
            initialValue: item.hxSpecialUse,
            rules: [
              {
                required: !paramDisabled,
                pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入专有用户!',
              },
            ],
          })(<RadioGroup>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </RadioGroup>)}
        </FormItem>
        <FormItem label="邮箱" hasFeedback {...formItemLayout}>
          {getFieldDecorator('Email', {
            initialValue: item.Email,
            rules: [
              {
                required: !paramDisabled,
                pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                message: '请输入邮箱!',
              },
            ],
          })(<Input placeholder="请输入邮箱!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="银行卡账号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('card', {
            initialValue: item.card,
            rules: [
              {
                required: !paramDisabled,
                pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入银行卡账号!',
              },
            ],
          })(<Input placeholder="请输入银行卡账号!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="环迅座机" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hxTel', {
            initialValue: item.hxTel,
            rules: [
              {
                required: false,
                // pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入环迅座机!',
              },
            ],
          })(<Input placeholder="请输入环迅座机!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="环迅联系地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hxAddress', {
            initialValue: item.hxAddress,
            rules: [
              {
                required: false,
                message: '请输入环迅联系地址!',
              },
            ],
          })(<Input placeholder="请输入环迅联系地址!" disabled={paramDisabled} />)}
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
