import React from 'react'
import PropTypes from 'prop-types'
import { Transfer, Form, Modal, Select, Input, Row, Col, Cascader } from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const { TextArea } = Input

class TransferModal extends React.Component {
  constructor(props) {
    super(props)
    let targetKeys = []
    if (this.props.item.idUsers) {
      const tmp = this.props.item.idUsers.split(',')
      targetKeys = tmp.map(i => Number(i))
      this.props.form.setFieldsValue({
        idUsers: tmp,
      })
    }
    this.state = {
      targetKeys,
      transferDisabled: false,
    }
  }

  filterOption = (inputValue, option) => {
    return option.text.indexOf(inputValue) > -1
  }

  handleChange = (targetKeys) => {
    this.setState({ targetKeys })
    this.props.form.setFieldsValue({ idUsers: targetKeys })
  }

  render() {
    const {
      item = {},
      onOk,
      storeuserList,
      locationList,
      orgIdusers,
      onGetIdUsers,
      parentOrgList,
      storeuserArr,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFieldsValue,
      },
      type,
      ...modalProps
    } = this.props

    const {
      targetKeys,
      transferDisabled,
    } = this.state

    const locationInfo = [{ value: '全国', label: '全国' }, ...locationList]
    console.log('ss', item)
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

    const idUsers = storeuserArr.map(ss => ({ key: ss.id, ...ss }))

    const initLocation = item.location ? item.location.split(',') : []

    const filterLocation = (inputValue, path) => {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1))
    }

    const handleLocationChange = (key) => {
      if (key[0] === '全国') {
        this.setState({
          transferDisabled: true,
        })
      } else {
        this.setState({
          transferDisabled: false,
        })
      }
      setFieldsValue({
        location: key,
      })
    }
    const disabled = true

    return (
      <Modal {...modalOpts} className={styles.modal} >
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
                  initialValue: initLocation,
                  rules: [
                    {
                      required: true,
                      message: '请输入地区信息!',
                    },
                  ],
                })(<Cascader
                  options={locationInfo}
                  showSearch={{ filterLocation }}
                  onChange={handleLocationChange}
                  placeholder="请输入地区信息"
                  changeOnSelect
                  allowClear
                  expandTrigger="hover"
                />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="站点信息" hasFeedback>
            <div
              style={{
                display: transferDisabled ? 'block' : 'none',
                backgroundColor: '#eeeeee80',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 9999,
              }}
            />
            {getFieldDecorator('idUsers', {
              initialValue: targetKeys,
              rules: [
                {
                  required: !transferDisabled,
                  message: '请选择门店信息!',
                },
              ],
            })(<Transfer
              disabled={disabled}
              className={styles.transfer}
              listStyle={{ width: '45%' }}
              dataSource={idUsers}
              showSearch
              filterOption={this.filterOption}
              targetKeys={targetKeys}
              onChange={this.handleChange}
              render={record => record.text}
              titles={['待分配', '已选中']}
              locale={{ searchPlaceholder: '请输入地址或者门店名筛选', itemUnit: '待处理', itemsUnit: '项', notFoundContent: '列表为空' }}
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
  onGetIdUsers: PropTypes.func,
  orgIdusers: PropTypes.array,
  parentOrgList: PropTypes.array,
  storeuserArr: PropTypes.array,
}

export default Form.create()(TransferModal)
