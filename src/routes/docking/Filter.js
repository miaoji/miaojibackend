import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Button, Row, Col, Input, Select, Modal,
} from 'antd'
import moment from 'moment'
import { DateRange, Location } from '../../components'
import { handleFields, defaultTime, config } from '../../utils'

const Search = Input.Search
const { Option } = Select
const { brand } = config

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
  onDownLoadAll,
  filter,
  storeuserList,
  downloadAllLoading,
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
          fields[item] = []
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

  let { name, idBrand, location } = filter

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

  const brandChange = (key) => {
    handleChange('idBrand', key)
  }

  const handleDownloadAll = () => {
    Modal.confirm({
      title: '您将下载今天权限下的所有门店数据(签收,操作,分派,业务量),是否确定继续?',
      content: '数据较多,生成数据耗时长,请不要离开当前页面',
      onOk() {
        onDownLoadAll()
      },
    })
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
      <div style={{ display: 'none' }}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('name', { initialValue: name })(
            <Search onPressEnter={nameChange} placeholder="按店铺名称搜索" onSearch={handleSubmit} />
          )}
        </Col>
      </div>
      <Col {...ColProps} xl={{ span: 4 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('idBrand', { initialValue: idBrand })(
          <Select
            showSearch
            allowClear
            style={{ width: '100%' }}
            onChange={brandChange}
            placeholder="按快递品牌搜索"

          >
            {brandList}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 7 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
          <DateRange onChange={handleChange.bind(null, 'createTime')} />
        )}
      </Col>
      <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button className="margin-right" onClick={handleReset}>刷新</Button>
            {auth.download && <Button type="primary" loading={downloadLoading} className="margin-right" onClick={onDownLoad}>下载Excel</Button>}
          </div>
        </div>
      </Col>
      <Col>
        <Button className="hide" type="primary" loading={downloadAllLoading} onClick={handleDownloadAll}>下载当日所有门店数据</Button>
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
  storeuserList: PropTypes.array,
  onDownLoadAll: PropTypes.func,
  downloadAllLoading: PropTypes.bool,
  downloadLoading: PropTypes.bool,
  auth: PropTypes.object,
}

export default Form.create()(Filter)
