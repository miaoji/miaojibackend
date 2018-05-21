import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  InputNumber,
  Modal,
} from 'antd'

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
  selectSiteName,
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

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="京东分配比例(%)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('number', {
            initialValue: item.number,
            rules: [
              {
                required: true,
                message: '请设置您需要设置的京东分配比例!',
              },
            ],
          })(<InputNumber style={{ width: 286 }} placeholder="请设置您需要设置的京东分配比例" />)}
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
  selectSiteName: PropTypes.array,
}

export default Form.create()(modal)
