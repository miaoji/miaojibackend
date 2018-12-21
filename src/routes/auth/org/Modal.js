import React from 'react'
import PropTypes from 'prop-types'
import { Transfer, Form, Modal, Select, Input, Row, Col, Cascader } from 'antd'
import Mock from './test'
import styles from './index.less'

const FormItem = Form.Item
const { TextArea } = Input

class TransferModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mockData: Mock.mockData,
      targetKeys: Mock.targetKeys,
    }
    console.log('sss', this.props)
  }

  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1
  }

  handleChange = (targetKeys) => {
    this.setState({ targetKeys })
    this.props.form.setFieldsValue({ test: targetKeys })
  }

  render() {
    const {
      item = {},
      onOk,
      storeuserList,
      locationList,
      orgIdusers,
      onChangeLocationType,
      locationSelectShow,
      onGetIdUsers,
      locationLoading,
      parentOrgList,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
      type,
      ...modalProps
    } = this.props

    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
        }
        onOk(data)
      })
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk,
    }

    return (
      <Modal {...modalOpts} className={styles.modal}>
        <Form layout="horizontal">
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="机构名称" hasFeedback>
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
            </Col>
            <Col span={8}>
              <FormItem label="父级机构" hasFeedback >
                {getFieldDecorator('parentId', {
                  initialValue: item.parentName,
                  rules: [
                    {
                      required: true,
                      message: '请选择父级机构',
                    },
                  ],
                })(<Select placeholder="请选择父级机构">{parentOrgList}</Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="地区信息" hasFeedback>
                {getFieldDecorator('location', {
                  rules: [
                    {
                      required: locationSelectShow,
                      message: '请输入地区信息!',
                    },
                  ],
                })(<Cascader
                  disabled={locationLoading}
                  options={locationList}
                  placeholder="请输入地区信息"
                />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="* 站点信息" hasFeedback>
            {getFieldDecorator('test', {
              rules: [
                {
                  required: false,
                  message: '请输入地区信息!',
                },
              ],
            })(<Transfer
              className={styles.transfer}
              listStyle={{ width: '45%' }}
              dataSource={this.state.mockData}
              showSearch
              filterOption={this.filterOption}
              targetKeys={this.state.targetKeys}
              onChange={this.handleChange}
              render={record => record.description}
              locale={{ searchPlaceholder: '请输入地址或者门店名筛选' }}
            />)}
          </FormItem>
          <FormItem label="备注信息" hasFeedback>
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
}

TransferModal.propTypes = {
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
  parentOrgList: PropTypes.array,
}

export default Form.create()(TransferModal)
