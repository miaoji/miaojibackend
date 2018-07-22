import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Select, Input } from 'antd'

const { Option } = Select
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
  onFilterChange,
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
    key = key.split('///')[0]
    handleChange('idBrand', key)
  }

  const brandData = {
    2: '优速',
    3: '龙邦',
    4: '速尔',
    5: '快捷',
    6: '全峰',
    7: '百世快递',
    8: '天天',
    9: '中通',
    11: '申通',
    12: '圆通',
    14: 'EMS',
    15: '国通',
    16: '蚂蚁帮',
    17: '邮政小包',
    18: '宅急送',
    19: '跨越',
    20: '京东',
    21: '达达',
    22: '万象',
    23: '妙寄',
    24: '中铁',
    27: '品骏',
    26: '安能',
    28: '日日顺',
    29: '如风达',
    10: '韵达',
    13: '顺丰',
    71: '高铁快运',
  }
  let brandList = []
  for (let item in brandData) {
    if (Object.prototype.hasOwnProperty.call(brandData, item)) {
      let key = `${item}///${brandData[item]}`
      let optionItem = <Option key={key}>{brandData[item]}</Option>
      brandList.push(optionItem)
    }
  }
  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('idBrand', { initialValue: '' })(
          <Select
            showSearch
            style={{ width: '100%' }}
            onSelect={brandChange}
            placeholder="按店铺名称搜索"
            size="large"
          >
            {brandList}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('orderSn', { initialValue: undefined })(<Search placeholder="按单号搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button size="large" onClick={handleReset}>刷新</Button>
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
}

export default Form.create()(Filter)
