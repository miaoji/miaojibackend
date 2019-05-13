import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, Input } from 'antd'
import { DateRange } from '../../components'

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
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime && createTime.length && createTime[0] && createTime[1]) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    } else {
      delete fields.createTime
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    // 判断搜索提交的内容是否为空
    // 为空则等于undefined
    for (let item in fields) {
      if (/^\s*$/g.test(fields[item])) {
        fields[item] = undefined
      }
    }
    onFilterChange({ ...filter, ...fields })
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
    filter.endTime = undefined
    filter.startTime = undefined
    filter.page = undefined
    filter.pageSize = undefined
    handleSubmit()
  }

  // 时间选择器change事件
  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    for (let item in fields) {
      if (/^\s*$/g.test(fields[item])) {
        fields[item] = undefined
      }
    }
    onFilterChange({ ...filter, ...fields })
  }

  const { name, mobile } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }


  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('name', { initialValue: name })(<Search placeholder="按名称搜索" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('mobile', { initialValue: mobile })(<Search placeholder="按手机号码搜索" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
          <DateRange onChange={handleChange.bind(null, 'createTime')} />
        )}
      </Col>
      <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button onClick={handleReset}>刷新</Button>
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
