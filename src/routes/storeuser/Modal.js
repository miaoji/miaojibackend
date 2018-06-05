import React from 'react'
import PropTypes from 'prop-types'
import { Form, InputNumber, Modal, Radio } from 'antd'

const RadioGroup = Radio.Group
const FormItem = Form.Item

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
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
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

  if (modalProps.modalType === 'versionswitch') {
    return (
      <Modal {...modalOpts} title="版本切换">
        <Form layout="horizontal">
          <FormItem label="版本" hasFeedback {...formItemLayout}>
            {getFieldDecorator('isBeta', {
              initialValue: item.isBeta,
              rules: [
                {
                  required: true,
                  message: '请选择版本',
                },
              ],
            })(
              <RadioGroup>
                <Radio value={'1'}>点货版</Radio>
                <Radio value={'0'}>正式版</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="通讯费" hasFeedback {...formItemLayout}>
          {getFieldDecorator('fee', {
            initialValue: item.communicateFee,
            rules: [
              {
                required: true,
                message: '请输入通讯费金额',
              },
            ],
          })(<InputNumber placeholder="请输入通讯费金额" style={{ width: '100%' }} />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
}

export default Form.create()(modal)
