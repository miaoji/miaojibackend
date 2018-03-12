import React from 'react'
import PropTypes from 'prop-types'
// import moment from 'moment'
// import { FilterItem } from '../../components'
import {
  Form, Button, Row, Col,
  // DatePicker,
  Input,
  // Cascader,
  // Switch,
  Modal
} from 'antd'
// import city from '../../utils/city'
import { DateRange } from '../../components'
import { time } from '../../utils'

const Search = Input.Search
// const { RangePicker } = DatePicker

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
  onRefresh,
  onSetJdConfig,
  onDownLoad,
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
    if (createTime && createTime.length === 2) {
      // fields.createTime = [createTime[0]._d.getTime(), createTime[1]._d.getTime()]
      const repairTime = time.repairTime(fields.createTime)
      fields.startTime = repairTime.startTime
      fields.endTime = repairTime.endTime
    }
    delete fields.createTime
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

  const handleDownLoad = () => {
    Modal.confirm({
      title: '下载前请确认是否是你想要的数据！',
      onOk() {
        onDownLoad({
          a: 1, b: 2
        })
      }
    })
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
    initialCreateTime[0] = filter.createTime[0]
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = filter.createTime[1]
  }


  return (
    <Row gutter={24}>
      <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button size="large" type="primary" onClick={onAdd}>填充单号池</Button>
          </div>
          <div>
            <Button size="large" type="primary" onClick={onSetJdConfig}>设置京东分配比例</Button>
          </div>
          <div>
            <Button size="large" type="primary" onClick={onRefresh}>刷新</Button>
          </div>
        </div>
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
  onDownLoad: PropTypes.func,
  onSetJdConfig: PropTypes.func
}

export default Form.create()(Filter)
