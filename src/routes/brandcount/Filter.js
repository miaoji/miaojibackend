import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, DateRange } from 'components'
import { Form, Button, Row, Col, Input } from 'antd'
import { time } from '../../utils'


const yesterTime = time.getToday(new Date().getTime())
const Search = Input.Search

const ColProps = {
  xl: 8,
  lg: 8,
  md: 8,
  sm: 12,
  xs: 24,
  style: {
    marginBottom: 16,
  },
}

const Filter = ({
  onFilterChange,
  echartShow,
  onEchartShowChange,
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
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { brand, createTime = [yesterTime, yesterTime] } = filter

  let initialCreateTime = []
  if (createTime && createTime[0]) {
    initialCreateTime[0] = moment(createTime[0])
  }
  if (createTime && createTime[1]) {
    initialCreateTime[1] = moment(createTime[1])
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }}>
        {getFieldDecorator('brand', { initialValue: brand })(<Search placeholder="按名称搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps}>
        <FilterItem>
          {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
            <DateRange style={{ width: '100%' }} size="large" onChange={handleChange.bind(null, 'createTime')} />
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button size="large" onClick={handleReset}>重置</Button>
          </div>
          <div>
            <Button className="hide" size="large" type="primary" onClick={() => { onEchartShowChange(!echartShow) }}>{echartShow ? '列表查看' : '饼状图查看'}</Button>
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
  echartShow: PropTypes.bool,
  onEchartShowChange: PropTypes.func,
}

export default Form.create()(Filter)
