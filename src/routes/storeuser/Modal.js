import React from 'react'
import PropTypes from 'prop-types'
import { Form, InputNumber, Modal } from 'antd'

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
