import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Select, Input } from 'antd'
import { config } from 'utils'

const { Option } = Select
const { brand } = config
const Search = Input.Search

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  filter,
  auth,
  onFilterChange,
  onDownLoad,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    onFilterChange(fields)
  }

  const brandChange = (key) => {
    handleChange('idBrand', key)
  }

  let brandList = []
  for (let item in brand) {
    if (Object.prototype.hasOwnProperty.call(brand, item)) {
      let key = `${item}///${brand[item]}`
      let optionItem = <Option key={key}>{brand[item]}</Option>
      brandList.push(optionItem)
    }
  }

  const typeArr = {
    1: '点货数',
    2: '入库数',
    3: '签收数',
    4: '补签数',
    5: '退回数',
  }
  const typeList = Object.keys(typeArr).map((i) => {
    return <Option key={i}>{typeArr[i]}</Option>
  })
  // for (let item in orderTypeForBusiness) {
  //   if (Object.prototype.hasOwnProperty.call(orderTypeForBusiness, item)) {
  //     let key = `${item}///${orderTypeForBusiness[item]}`
  //     let optionItem = <Option key={key}>{orderTypeForBusiness[item]}</Option>
  //     typeList.push(optionItem)
  //   }
  // }

  const stateChange = (key) => {
    handleChange('state', key)
  }

  const { idBrand, state, orderSn } = filter
  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('idBrand', { initialValue: idBrand })(
          <Select
            showSearch
            allowClear
            style={{ width: '100%' }}
            onChange={brandChange}
            placeholder="按快递品牌搜索"
            size="large"
          >
            {brandList}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('state', { initialValue: state })(
          <Select
            showSearch
            allowClear
            style={{ width: '100%' }}
            onChange={stateChange}
            placeholder="按操作类型搜索"
            size="large"
          >
            {typeList}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('orderSn', { initialValue: orderSn })(<Search placeholder="按单号搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button size="large" className="margin-right" onClick={handleReset}>刷新</Button>
          </div>
        </div>
      </Col>
      <Col>
        {auth.downloadDetailExcel && <Button style={{ display: 'block' }} size="large" type="primary" onClick={onDownLoad}>下载</Button>}
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  onDownLoad: PropTypes.func,
  auth: PropTypes.object,
}

export default Form.create()(Filter)
