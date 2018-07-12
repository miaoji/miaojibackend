import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Radio, Select } from 'antd'

const RadioGroup = Radio.Group
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
  onUpdateState,
  modalMenuLevel,
  mpidOption,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
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

  const handleMenuLevelChange = (e) => {
    onUpdateState({ modalMenuLevel: e.target.value })
    setFieldsValue({
      parentMenuId: undefined,
      bpid: undefined,
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const paramDisabled = modalMenuLevel === 1
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
        <FormItem label="菜单级别" hasFeedback {...formItemLayout}>
          {getFieldDecorator('menuLevel', {
            initialValue: item.menuLevel || 1,
            rules: [
              {
                required: true,
                message: '请输入菜单级别!',
              },
            ],
          })(<RadioGroup onChange={handleMenuLevelChange}>
            <Radio value={1}>一级菜单</Radio>
            <Radio value={2}>二级菜单</Radio>
            <Radio value={3}>三级菜单</Radio>
          </RadioGroup>)}
        </FormItem>
        <div style={{ display: paramDisabled ? 'none' : 'block' }}>
          <FormItem label="父级菜单" hasFeedback {...formItemLayout}>
            {getFieldDecorator('parentMenuId', {
              initialValue: item.parentMenuId,
              rules: [
                {
                  required: !paramDisabled,
                  message: '请输入父级菜单!',
                },
              ],
            })(<Select
              showSearch
              filterOption={false}
              style={{ width: '100%' }}
              placeholder="请选择父级!"
            >
              {mpidOption}
            </Select>)}
          </FormItem>
        </div>
        <FormItem label="图标" hasFeedback {...formItemLayout}>
          {getFieldDecorator('icon', {
            initialValue: item.icon,
            rules: [
              {
                required: false,
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
                required: false,
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
                required: false,
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
  onUpdateState: PropTypes.func,
  modalMenuLevel: PropTypes.number,
  mpidOption: PropTypes.array,
}

export default Form.create()(modal)
