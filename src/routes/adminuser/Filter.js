import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, Input } from 'antd'
import { DateRange } from '../../components'
import { handleFields } from '../../utils'

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

  const { name, accounts, orgName } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  const inputClear = (e, key) => {
    console.log('e', e)
    console.log('key', key)
    if (e && e.target && !e.target.value) {
      handleChange(key, '')
    }
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 8 }}>
        {getFieldDecorator('name', { initialValue: name })(<Search onChange={e => inputClear(e, 'name')} allowClear placeholder="按姓名搜索" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 8 }}>
        {getFieldDecorator('accounts', { initialValue: accounts })(<Search onChange={e => inputClear(e, 'accounts')} allowClear placeholder="按账号搜索" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 8 }}>
        {getFieldDecorator('orgName', { initialValue: orgName })(<Search onChange={e => inputClear(e, 'orgName')} allowClear placeholder="按所属机构搜索" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 7 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
          <DateRange onChange={handleChange.bind(null, 'createTime')} />
        )}
      </Col>
      <Col {...TwoColProps} xl={{ span: 6 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
        <Button className="margin-right" onClick={handleReset}>刷新</Button>
        <Button type="primary" className="margin-right" onClick={onAdd}>注册用户</Button>
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
}

export default Form.create()(Filter)
