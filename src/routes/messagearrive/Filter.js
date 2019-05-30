import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Button, Row, Col, Select, Input,
} from 'antd'
import moment from 'moment'
import { DateRange, Location } from '../../components'
import { handleFields, defaultTime, config } from '../../utils'

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

let brandList = []
for (let item in brand) {
  if (Object.prototype.hasOwnProperty.call(brand, item)) {
    let key = `${item}`
    let optionItem = <Option key={key}>{brand[item]}</Option>
    brandList.push(optionItem)
  }
}

const Filter = ({
  // onAdd,
  auth,
  onFilterChange,
  onDownLoad,
  filter,
  storeuserList,
  downloadLoading,
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
          // fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    filter.createTime = []
    setFieldsValue(fields)
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

  let { name, location, callee } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }
  const nameChange = (key) => {
    handleChange('name', key)
  }

  const inputClear = (e, key) => {
    if (e && e.target && !e.target.value) {
      handleChange(key, '')
    }
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('callee', { initialValue: callee })(<Search onChange={e => inputClear(e, 'callee')} allowClear placeholder="按手机号筛选" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('name', { initialValue: name })(
          <Select
            showSearch
            style={{ width: '100%' }}
            onChange={nameChange}
            placeholder="按店铺名称搜索"
            allowClear
          >
            {storeuserList}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('location', { initialValue: location })(
          <Location allowClear handleChange={handleChange.bind(null, 'location')} />
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
          <DateRange onChange={handleChange.bind(null, 'createTime')} />
        )}
      </Col>
      <Col {...TwoColProps} xl={{ span: 6 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button className="margin-right" onClick={handleReset}>刷新</Button>
            {auth.downloadExcel && <Button type="primary" loading={downloadLoading} className="margin-right" onClick={onDownLoad}>下载Excel</Button>}
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  onDownLoad: PropTypes.func,
  storeuserList: PropTypes.array,
  downloadLoading: PropTypes.bool,
  auth: PropTypes.object,
}

export default Form.create()(Filter)
