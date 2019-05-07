import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Radio, Select, Icon } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typeChange: 2,
    }
    this.handleMenuTypeChange = this.handleMenuTypeChange.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  componentWillMount() {
    this.setState({
      typeChange: this.props.item.menuType || 2,
    })
  }

  handleCheck = (key) => {
    console.log('key', key)
    this.props.form.setFieldsValue({
      menus: key,
    })
  }

  handleMenuTypeChange(e) {
    console.log('e', e)
    const type = e.target.value

    this.setState({
      typeChange: type,
    })
  }
  handleOk() {
    const { item = {}, form: { validateFields, getFieldsValue }, onOk } = this.props
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
  render() {
    const {
      item = {},
      type,
      onOk,
      list,
      form: {
        getFieldDecorator,
      },
      ...modalProps
    } = this.props
    const { typeChange } = this.state
    const modalOpts = {
      ...modalProps,
      onOk: this.handleOk,
    }

    if (type === 'addbutton' || type === 'modbutton') {
      return (
        <Modal {...modalOpts}>
          <Form layout="horizontal">
            <FormItem label="按钮名称" hasFeedback {...formItemLayout}>
              {getFieldDecorator('menuName', {
                initialValue: item.menuName,
                rules: [
                  {
                    required: true,
                    message: '请输入菜单名称',
                  },
                ],
              })(<Input placeholder="请输入菜单名称" />)}
            </FormItem>
            <FormItem label="按钮类型" hasFeedback {...formItemLayout}>
              {getFieldDecorator('buttonType', {
                initialValue: item.buttonType,
                rules: [
                  {
                    required: true,
                    message: '请输入排序编号',
                  },
                ],
              })(<Input placeholder="请输入排序" />)}
            </FormItem>
            <FormItem label="备注信息" hasFeedback {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: item.remark,
              })(<Input placeholder="请输入备注信息" />)}
            </FormItem>
          </Form>
        </Modal>
      )
    }

    const optionChildren = ['down-square', 'left-square', 'right-square', 'login', 'logout', 'menu-fold'].map((i) => {
      return <Option key={i}><Icon style={{ height: '100%' }} type={i} /><span> {i}</span></Option>
    })

    console.log('123', ((item.menuLevel === 1 && type === 'update')))
    console.log('444', (!item.menuLevel && type === 'create'))
    console.log(item)

    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="菜单类型" hasFeedback {...formItemLayout}>
            {getFieldDecorator('menuType', {
              initialValue: item.menuType || 2,
              rules: [
                {
                  required: true,
                  message: '请选择菜单类型',
                },
              ],
            })(<RadioGroup style={{ width: '100%' }} onChange={this.handleMenuTypeChange}>
              <Radio value={1}>导航菜单</Radio>
              <Radio value={2}>视图菜单</Radio>
            </RadioGroup>)}
          </FormItem>
          <FormItem label="菜单名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator('menuName', {
              initialValue: item.menuName,
              rules: [
                {
                  required: true,
                  message: '请输入菜单名称',
                },
              ],
            })(<Input placeholder="请输入菜单名称" />)}
          </FormItem>
          {
            ((item.menuLevel === 1 && type === 'update') || (!item.menuLevel && type === 'create')) && <FormItem label="图标信息" hasFeedback {...formItemLayout}>
              {getFieldDecorator('icon', {
                initialValue: item.icon,
                rules: [
                  {
                    required: true,
                    message: '请输入图标信息',
                  },
                ],
              })(<Select placeholder="请选择图标信息">{optionChildren}</Select>)}
            </FormItem>}
          {
            (typeChange === 2) && <FormItem label="路由地址" hasFeedback {...formItemLayout}>
              {getFieldDecorator('target', {
                initialValue: item.target,
                rules: [
                  {
                    required: true,
                    message: '请输入路由地址',
                  },
                ],
              })(<Input placeholder="请输入路由地址信息" />)}
            </FormItem>
          }
          <FormItem label="排序" hasFeedback {...formItemLayout}>
            {getFieldDecorator('menuDesc', {
              initialValue: item.menuDesc,
              rules: [
                {
                  required: true,
                  message: '请输入排序编号',
                },
              ],
            })(<Input placeholder="请输入排序" />)}
          </FormItem>
          <FormItem label="备注信息" hasFeedback {...formItemLayout}>
            {getFieldDecorator('description', {
              initialValue: item.description,
            })(<Input placeholder="请输入备注信息" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  list: PropTypes.array,
}

export default Form.create()(modal)
