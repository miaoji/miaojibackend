import React from 'react'
import PropTypes from 'prop-types'
// import moment from 'moment'
import { Form, Button, Row, Col, Input } from 'antd'
import { DateRange } from '../../components'
import { handleFields, defaultTime } from '../../utils'

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
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  filter = defaultTime(filter, 7, 6)
  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    // 为空则等于undefined
    for (let item in fields) {
      if (/^\s*$/g.test(fields[item])) {
        fields[item] = undefined
      }
    }
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          // fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    filter.endTime = undefined
    filter.startTime = undefined
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    // 判空
    for (let item in fields) {
      if (/^\s*$/g.test(fields[item])) {
        fields[item] = undefined
      }
    }
    onFilterChange(fields)
  }
  const { name, serialNumber, createTime } = filter

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('name', { initialValue: name })(<Search placeholder="按站点名搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('serialNumber', { initialValue: serialNumber })(<Search placeholder="按运单号搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('createTime', { initialValue: createTime })(
          <DateRange size="large" onChange={handleChange.bind(null, 'createTime')} />
        )}
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
