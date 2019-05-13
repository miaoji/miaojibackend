import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, Input } from 'antd'
import { DateRange } from '../../../components'
import { handleFields } from '../../../utils'
import { getUserId } from '../../../utils/getUserInfo'

const userId = getUserId()
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
  onUpdateAdminRole,
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

  const { roleName } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }


  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 3 }} md={{ span: 8 }}>
        {getFieldDecorator('roleName', { initialValue: roleName })(<Search placeholder="按角色名称搜索" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 7 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
          <DateRange onChange={handleChange.bind(null, 'createTime')} />
        )}
      </Col>
      <Col {...TwoColProps} xl={{ span: 6 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
        <Button className="margin-right" onClick={handleReset}>刷新</Button>
        <Button type="primary" className="margin-right" onClick={onAdd}>新增角色</Button>
      </Col>
      <Col style={{ display: userId === 1 ? 'block' : 'none' }}>
        <Button type="primary" className="margin-right" onClick={onUpdateAdminRole}>更新权限</Button>
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
  onUpdateAdminRole: PropTypes.func,
}

export default Form.create()(Filter)
