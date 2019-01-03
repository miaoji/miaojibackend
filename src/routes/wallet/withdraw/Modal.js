import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Radio } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { TextArea } = Input

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
      show: false,
    }
  }
  render() {
    const {
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
    } = this.props

    const { show } = this.state

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
    const onStatusChonge = (e) => {
      console.log('e', e)
      if (e.target.value === 'refuse') {
        this.setState({
          show: true,
        })
      } else {
        this.setState({
          show: false,
        })
      }
    }
    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="提现账号" hasFeedback {...formItemLayout}>
            {getFieldDecorator('alipayaccount', {
              initialValue: item.alipayaccount,
              rules: [
                {
                  required: true,
                  message: '提现账号不能为空!',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem label="提现金额(元)" hasFeedback {...formItemLayout}>
            {getFieldDecorator('price', {
              initialValue: item.price,
              rules: [
                {
                  required: true,
                  message: '提现金额不能为空!',
                },
              ],
            })(<Input placeholder="提现金额!" disabled />)}
          </FormItem>
          <FormItem label="审核" hasFeedback {...formItemLayout}>
            {getFieldDecorator('status', {
              initialValue: item.status,
              rules: [
                {
                  required: true,
                  message: '请选择通过状态!',
                },
              ],
            })(
              <RadioGroup onChange={onStatusChonge}>
                <Radio value="success">通过</Radio>
                <Radio value="refuse">拒绝</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <div style={{ display: show ? 'block' : 'none' }}>
            <FormItem label="拒绝原因" hasFeedback {...formItemLayout}>
              {getFieldDecorator('transferDetails', {
                initialValue: item.transferDetails,
                rules: [
                  {
                    required: show,
                    message: '拒绝原因不能超过100字!',
                    max: 100,
                  },
                ],
              })(<TextArea placeholder="请输入拒绝原因!" style={{ height: '50', width: '100%' }} />)}
            </FormItem>
          </div>
        </Form>
      </Modal >
    )
  }
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  storeuserList: PropTypes.array,
}

export default Form.create()(modal)
