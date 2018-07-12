import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Tree } from 'antd'
import './Modal.less'

const TreeNode = Tree.TreeNode
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

  const renderTreeNodes = (data) => {
    if (data.length) {
      return data.map((items) => {
        if (items.children) {
          return (
            <TreeNode
              title={items.title}
              key={items.key}
              dataRef={items}
            >
              {renderTreeNodes(items.children)}
            </TreeNode>
          )
        }
        return (<TreeNode
          {...items}
        />)
      })
    }
    return <TreeNode title="parent 1-0" key="0-0-0" disabled />
  }

  const handleCheck = (key) => {
    console.log('key', key)
    setFieldsValue({
      menus: key,
    })
  }

  const defaultCheckedKeys = item.MENU_ID
  console.log('defaultCheckedKeys', defaultCheckedKeys)

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="角色名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleName', {
            initialValue: item.ROLE_NAME,
            rules: [
              {
                required: true,
                message: '请输入角色名称!',
              },
            ],
          })(<Input placeholder="请输入角色名称!" disabled={paramDisabled} />)}
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
            {renderTreeNodes(menuList)}
          </Tree>)}
        </FormItem>
        <FormItem label="备注信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.DESCRIPTION,
            rules: [
              {
                required: true,
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
}

export default Form.create()(modal)
