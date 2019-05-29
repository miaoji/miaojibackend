import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Select } from 'antd'
import { config } from 'utils'

const { Option } = Select
const { brand } = config

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
      let key = `${item}`
      let optionItem = <Option key={key}>{brand[item]}</Option>
      brandList.push(optionItem)
    }
  }

  const typeInfo = {
    1: '入库',
    2: '出库',
  }
  let typeList = []
  for (let item in typeInfo) {
    if (Object.prototype.hasOwnProperty.call(typeInfo, item)) {
      let key = `${item}`
      let optionItem = <Option key={key}>{typeInfo[item]}</Option>
      typeList.push(optionItem)
    }
  }

  const joinInfo = {
    1: '对接成功',
    2: '对接失败',
  }

  const joinList = Object.keys(joinInfo).map((key) => {
    return <Option key={key}>{joinInfo[key]}</Option>
  })

  const typeChange = (key) => {
    handleChange('type', key)
  }

  const joinChange = (key) => {
    handleChange('join', key)
  }

  const { idBrand, type, join } = filter
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

          >
            {brandList}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('type', { initialValue: type })(
          <Select
            showSearch
            allowClear
            style={{ width: '100%' }}
            onChange={typeChange}
            placeholder="按快递状态筛选"

          >
            {typeList}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('join', { initialValue: join })(
          <Select
            showSearch
            allowClear
            style={{ width: '100%' }}
            onChange={joinChange}
            placeholder="按对接状态筛选"

          >
            {joinList}
          </Select>
        )}
      </Col>
      <Col {...TwoColProps} xl={{ span: 6 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button className="margin-right" onClick={handleReset}>刷新</Button>
            {auth.downloadDetail && <Button className="margin-right" type="primary" onClick={onDownLoad}>下载</Button>}
          </div>
        </div>
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
