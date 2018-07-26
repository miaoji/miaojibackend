import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, Input, Cascader, Radio } from 'antd'
import { DateRange } from '../../../components'
import { handleFields } from '../../../utils'

const RadioGroup = Radio.Group
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
  onAdd,
  onFilterChange,
  onChangeLocationType,
  locationList,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
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
    filter.createTime = []
    filter.page = undefined
    filter.pageSize = undefined
    setFieldsValue(fields)
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
    onFilterChange({ ...fields })
  }

  const { orgName, roleName, location } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  const filterLocation = (inputValue, path) => {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1))
  }
  const handleLocationChange = (key) => {
    console.log('key', key)
    handleChange('location', key)
    setFieldsValue({
      location: key,
    })
  }
  const handleTypeChange = (key) => {
    console.log('key', key)
    onChangeLocationType(key.target.value)
  }
  const initLocation = location ? location.split(',') : undefined
  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 8 }}>
        {getFieldDecorator('orgName', { initialValue: orgName })(<Search placeholder="按机构名称搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 8 }}>
        {getFieldDecorator('roleName', { initialValue: roleName })(<Search placeholder="按角色名称搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
        {getFieldDecorator('locationType', { initialValue: 1 })(
          <RadioGroup size="large" onChange={handleTypeChange}>
            <Radio value={1}>按省筛选</Radio>
            <Radio value={2}>按市筛选</Radio>
            <Radio value={3}>按县筛选</Radio>
          </RadioGroup>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 8 }}>
        {getFieldDecorator('location', { initialValue: initLocation })(
          <Cascader
            showSearch={{ filterLocation }}
            size="large"
            options={locationList}
            onChange={handleLocationChange}
            placeholder="请输入地区信息"
          />
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 7 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
          <DateRange size="large" onChange={handleChange.bind(null, 'createTime')} />
        )}
      </Col>
      <Col {...TwoColProps} xl={{ span: 6 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
        <Button size="large" className="margin-right" onClick={handleReset}>刷新</Button>
        <Button size="large" type="primary" className="margin-right" onClick={onAdd}>新增机构</Button>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  locationList: PropTypes.array,
  onChangeLocationType: PropTypes.func,
}

export default Form.create()(Filter)
