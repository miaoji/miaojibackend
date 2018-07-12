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
    return <span style={{ color: '#ffc413' }}>暂无数据</span>
  }

  const handleCheck = (key, ee) => {
    console.log('key', key)
    console.log('ee', ee)
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="角色名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleName', {
            initialValue: item.roleName,
            rules: [
              {
                required: !paramDisabled,
                pattern: /^[0-9a-zA-Z]*$/,
                message: '请输入角色名称!',
              },
            ],
          })(<Input placeholder="请输入角色名称!" disabled={paramDisabled} />)}
        </FormItem>
        <FormItem label="权限" hasFeedback {...formItemLayout}>
          {getFieldDecorator('menus', {
            initialValue: item.menus,
            rules: [
              {
                required: false,
                pattern: /^[0-9a-zA-Z]*$/,
                message: '请选择能访问的菜单!',
              },
            ],
          })(<Tree
            checkable
            showLine
            selectable={false}
            // onExpand={this.onExpand}
            // expandedKeys={this.state.expandedKeys}
            // autoExpandParent={this.state.autoExpandParent}
            // checkedKeys={this.state.checkedKeys}
            // onSelect={this.onSelect}
            // selectedKeys={this.state.selectedKeys}
            // checkStrictly
            onCheck={handleCheck}
          >
            {renderTreeNodes(menuList)}
          </Tree>)}
        </FormItem>
        <FormItem label="备注信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
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
}

export default Form.create()(modal)
