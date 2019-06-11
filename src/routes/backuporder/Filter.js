import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd'
import styles from './index.less'

const { Search } = Input
const Filter = ({
  onFilterChange,
  filter,
  buttonLoading,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields.serialNumber = fields.serialNumber.trim()
    if (!fields.serialNumber) return
    onFilterChange(fields)
  }

  const { serialNumber } = filter

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    for (let item in fields) {
      if (/^\s*$/g.test(fields[item])) {
        fields[item] = undefined
      }
    }
    onFilterChange({ ...filter, ...fields })
  }

  const inputClear = (e, key) => {
    if (e && e.target && !e.target.value) {
      handleChange(key)
    }
  }

  return (
    <div className={styles.filter} >
      <div className={styles.filter_title}><span className="icon_line" />运单查询 : </div>
      <div className="input" style={{ marginLeft: '20px' }}>
        {getFieldDecorator('serialNumber', {
          initialValue: serialNumber,
        })(<Search onChange={e => inputClear(e, 'serialNumber')} allowClear className={styles.filter_input} placeholder="按订单号或手机号搜索订单" onSearch={handleSubmit} />)}
      </div>
      <div style={{ marginLeft: '20px' }}>
        <Button className={styles.filter_button} loading={buttonLoading} type="primary" onClick={handleSubmit}>搜索</Button>
      </div>
    </div>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  buttonLoading: PropTypes.bool,
}

export default Form.create()(Filter)
