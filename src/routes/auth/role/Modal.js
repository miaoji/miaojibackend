import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Tree, Select } from 'antd'
// import { isSuperAdmin } from '../../../utils'
import './Modal.less'

const FormItem = Form.Item
const { TextArea } = Input

// const untieArray = (arr = []) => {
//   let tmp = []
//   arr.forEach((i) => {
//     if (i.children && i.children.length) {

//       tmp =
//     } else {
//       tmp = [...tmp, i]
//     }
//   })
// }

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
  sourceMenuList,
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

  console.log('sourceMenuList', sourceMenuList)

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const paramDisabled = type === 'update'

  const handleCheck = (key, a) => {
    console.log('a', a)
    console.log('key', key)
    setFieldsValue({
      menus: key,
    })
  }

  const handleRoldSelect = (key) => {
    onRoldSelect(JSON.parse(key))
  }

  const defaultCheckedKeys = item.MENU_ID ? item.MENU_ID.split(',') : undefined
  const defaultRoleId = item.PARENT_ROLE_NAME

  if (type === 'readAuth') {
    return (
      <Modal {...modalOpts} title="权限详情">
        <Form layout="horizontal">
          <FormItem hasFeedback>
            <Tree showLine>
              {menuList.length > 0 ? menuList : <span style={{ color: 'red' }}>请指定父级角色</span>}
            </Tree>
          </FormItem>
        </Form>
      </Modal>
    )
  }

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
                whitespace: true,
              },
            ],
          })(<Input placeholder="请输入角色名称!" />)}
        </FormItem>
        <FormItem label="父级角色" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleId', {
            initialValue: defaultRoleId,
            rules: [
              {
                required: item.ID !== 1,
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
  // if (isSuperAdmin()) {
  // }

  // return (
  //   <Modal {...modalOpts}>
  //     <Form layout="horizontal">
  //       <FormItem label="角色名称" hasFeedback {...formItemLayout}>
  //         {getFieldDecorator('roleName', {
  //           initialValue: item.ROLE_NAME,
  //           rules: [
  //             {
  //               required: true,
  //               message: '请输入角色名称!',
  //             },
  //           ],
  //         })(<Input placeholder="请输入角色名称!" />)}
  //       </FormItem>
  //       <FormItem label="权限" hasFeedback {...formItemLayout}>
  //         {getFieldDecorator('menus', {
  //         })(<Tree
  //           defaultCheckedKeys={defaultCheckedKeys}
  //           checkable
  //           showLine
  //           selectable={false}
  //           defaultExpandAll={paramDisabled}
  //           onCheck={handleCheck}
  //         >
  //           {menuList.length > 0 ? menuList : <span style={{ color: 'red' }}>请指定父级角色</span>}
  //         </Tree>)}
  //       </FormItem>
  //       <FormItem label="备注信息" hasFeedback {...formItemLayout}>
  //         {getFieldDecorator('description', {
  //           initialValue: item.DESCRIPTION,
  //           rules: [
  //             {
  //               required: false,
  //               message: '备注信息字数不能超过100!',
  //               max: 100,
  //             },
  //           ],
  //         })(<TextArea placeholder="请输入设置备注信息!" style={{ height: '50', width: '100%' }} />)}
  //       </FormItem>
  //     </Form>
  //   </Modal>
  // )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  menuList: PropTypes.array,
  roleList: PropTypes.array,
  onRoldSelect: PropTypes.func,
  sourceMenuList: PropTypes.array,
}

export default Form.create()(modal)
