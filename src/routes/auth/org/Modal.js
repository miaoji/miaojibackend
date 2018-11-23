import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Cascader, Radio, Spin } from 'antd'
import { isSuperAdmin } from '../../../utils'
import style from './Modal.less'

const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioGroup = Radio.Group

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
  storeuserList,
  locationList,
  orgIdusers,
  onChangeLocationType,
  locationSelectShow,
  onGetIdUsers,
  locationLoading,
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

  const handleChange = (key) => {
    onGetIdUsers(key)
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  let initIdusers = item.idUsers ? item.idUsers.split(',').map(val => Number(val)) : []

  if (orgIdusers && orgIdusers.length > 0) {
    initIdusers = orgIdusers
  }
  const initLocation = item.location ? item.location.split(',') : []

  const handleTypeChange = (key) => {
    setFieldsValue({
      location: undefined,
    })
    onChangeLocationType(key.target.value)
  }

  let LocationTypeOption = [
    <Radio value={1}>省级</Radio>,
    <Radio value={2}>市级</Radio>,
    <Radio value={3}>县级</Radio>,
  ]
  if (isSuperAdmin()) {
    LocationTypeOption = [
      <Radio value={1}>省级</Radio>,
      <Radio value={2}>市级</Radio>,
      <Radio value={3}>县级</Radio>,
      <Radio value={4}>全国</Radio>,
    ]
  }

  const filterLocation = (inputValue, path) => {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1))
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="机构名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('orgName', {
            initialValue: item.orgName,
            rules: [
              {
                required: true,
                message: '请输入机构名称!',
              },
            ],
          })(<Input placeholder="请输入机构名称!" />)}
        </FormItem>
        <FormItem label="地区等级" hasFeedback {...formItemLayout}>
          {getFieldDecorator('locationType', {
            initialValue: item.locationType || 1,
            rules: [
              {
                required: true,
                message: '请输入地区等级!',
              },
            ],
          })(<RadioGroup onChange={handleTypeChange}>
            {LocationTypeOption}
          </RadioGroup>)}
        </FormItem>
        <div className={style.location_box} style={{ display: locationSelectShow ? 'block' : 'none' }}>
          {locationLoading ? <div className={style.location}><Spin /></div> : ''}
          <FormItem label="地区信息" hasFeedback {...formItemLayout}>
            {getFieldDecorator('location', {
              initialValue: initLocation,
              rules: [
                {
                  required: locationSelectShow,
                  message: '请输入地区信息!',
                },
              ],
            })(<Cascader
              disabled={locationLoading}
              showSearch={{ filterLocation }}
              options={locationList}
              onChange={handleChange}
              placeholder="请输入地区信息"
            />)}
          </FormItem>
          <FormItem label="站点信息确认" hasFeedback {...formItemLayout}>
            {getFieldDecorator('idUsers', {
              initialValue: initIdusers,
              rules: [
                {
                  required: false,
                  type: 'array',
                  message: '您选择的地址没有可以管理的站点!',
                },
              ],
            })(<Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="暂无可以管理的站点!"
            >
              {storeuserList}
            </Select>)}
          </FormItem>

        </div>
        <FormItem label="备注信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [
              {
                required: false,
                message: '字数不能超过100!',
                max: 100,
              },
            ],
          })(<TextArea placeholder="请输入备注信息!" style={{ height: '50', width: '100%' }} />)}
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
  modalMenuLevel: PropTypes.number,
  storeuserList: PropTypes.array,
  locationList: PropTypes.array,
  onChangeLocationType: PropTypes.func,
  onGetIdUsers: PropTypes.func,
  orgIdusers: PropTypes.array,
  locationSelectShow: PropTypes.bool,
  locationLoading: PropTypes.bool,
}

export default Form.create()(modal)
