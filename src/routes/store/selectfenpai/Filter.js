import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Button, Row, Col, Select,
} from 'antd'
import { DateRange, Location } from '../../../components'
import { handleFields, defaultTime } from '../../../utils'

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
  auth,
  storeuserList,
  onFilterChange,
  onDownLoad,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  filter = defaultTime(filter)
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
    if (key === 'location') {
      setFieldsValue({
        location: values,
      })
    }
    fields = handleFields(fields)
    for (let item in fields) {
      if (/^\s*$/g.test(fields[item])) {
        fields[item] = undefined
      }
    }
    onFilterChange({ ...filter, ...fields })
  }

  let { name, createTime, location } = filter

  const nameChange = (key) => {
    handleChange('name', key)
  }


  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('name', { initialValue: name })(
          <Select
            showSearch
            style={{ width: '100%' }}
            onSelect={nameChange}
            placeholder="按店铺名称搜索"

          >
            {storeuserList}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('location', { initialValue: location })(
          <Location handleChange={handleChange.bind(null, 'location')} />
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 7 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('createTime', { initialValue: createTime })(
          <DateRange onChange={handleChange.bind(null, 'createTime')} />
        )}
      </Col>
      <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button className="margin-right" onClick={handleReset}>刷新</Button>
            {auth.downloadExcel && <Button type="primary" onClick={onDownLoad}>下载为Excel</Button>}
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  storeuserList: PropTypes.array,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  onDownLoad: PropTypes.func,
  auth: PropTypes.object,
}

export default Form.create()(Filter)
