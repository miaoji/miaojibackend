import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Tree, Cascader, Select } from 'antd'
// import city from '../../../utils/city'
import './Modal.less'

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
  menuList,
  locationList,
  roleList,
  onRoldSelect,
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

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const paramDisabled = type === 'update'

  const handleCheck = (key) => {
    setFieldsValue({
      menus: key,
    })
  }

  const onChange = (key) => {
    console.log('key', key)
  }

  const handleRoldSelect = (key) => {
    onRoldSelect(JSON.parse(key))
  }

  const defaultCheckedKeys = item.MENU_ID ? eval(item.MENU_ID) : undefined
  if (type === 'update') {
    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="地区信息" hasFeedback {...formItemLayout}>
            {getFieldDecorator('roleLocation', {
              initialValue: item.ROLE_LOCATION ? eval(item.ROLE_LOCATION) : [],
              rules: [
                {
                  required: false,
                  message: '请输入地区信息!',
                },
              ],
            })(<Cascader options={locationList} onChange={onChange} placeholder="请输入地区信息" />)}
          </FormItem>
          <FormItem label="备注信息" hasFeedback {...formItemLayout}>
            {getFieldDecorator('description', {
              initialValue: item.DESCRIPTION,
              rules: [
                {
                  required: false,
                  message: '备注信息字数不能超过100!',
                  max: 100,
                },
              ],
            })(<TextArea placeholder="请输入设置备注信息!" style={{ height: '50', width: '100%' }} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="父级角色" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleId', {
            initialValue: item.roleId,
            rules: [
              {
                // required: true,
                message: '请输入父级角色!',
              },
            ],
          })(<Select
            showSearch
            filterOption={false}
            style={{ width: '100%' }}
            onSelect={handleRoldSelect}
            placeholder="请输入父级角色!"
          >
            {roleList}
          </Select>)}
        </FormItem>
        <FormItem label="角色名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleName', {
            initialValue: item.ROLE_NAME,
            rules: [
              {
                required: true,
                message: '请输入角色名称!',
              },
            ],
          })(<Input placeholder="请输入角色名称!" />)}
        </FormItem>
        <FormItem label="权限" hasFeedback {...formItemLayout}>
          {getFieldDecorator('menus', {
          })(<Tree
            defaultCheckedKeys={defaultCheckedKeys}
            checkable
            showLine
            selectable={false}
            defaultExpandAll={paramDisabled}
            onCheck={handleCheck}
          >
            {menuList.length > 0 ? menuList : <span style={{ color: 'red' }}>请指定父级角色</span>}
          </Tree>)}
        </FormItem>
        <FormItem label="地区信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleLocation', {
            initialValue: item.ROLE_LOCATION ? eval(item.ROLE_LOCATION) : [],
            rules: [
              {
                required: false,
                message: '请输入地区信息!',
              },
            ],
          })(<Cascader options={locationList} onChange={onChange} placeholder="请输入地区信息" />)}
        </FormItem>
        <FormItem label="备注信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.DESCRIPTION,
            rules: [
              {
                required: false,
                message: '备注信息字数不能超过100!',
                max: 100,
              },
            ],
          })(<TextArea placeholder="请输入设置备注信息!" style={{ height: '50', width: '100%' }} />)}
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
  menuList: PropTypes.array,
  locationList: PropTypes.array,
  roleList: PropTypes.array,
  onRoldSelect: PropTypes.func,
}

export default Form.create()(modal)
