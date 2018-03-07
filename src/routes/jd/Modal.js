import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  // InputNumber,
  // Radio,
  Modal,
  // Cascader,
  Select,
} from 'antd'
// import city from '../../utils/city'

const FormItem = Form.Item
// const Option = Select.Option
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

  const paramDisabled = type === 'update'

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="填充单号数量" hasFeedback {...formItemLayout}>
          {getFieldDecorator('number', {
            initialValue: item.number,
            rules: [
              {
                required: true,
                message: '请输入您要填充的单号数量!',
              },
            ],
          })(<Input placeholder="请输入您要填充的单号数量"/>)}
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
