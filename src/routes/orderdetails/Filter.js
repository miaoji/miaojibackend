import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd'
import styles from './index.less'

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
    onFilterChange(fields)
  }

  const { serialNumber } = filter

  return (
    <div className={styles.filter}>
      <div className={styles.filter_title}>运单查询 : </div>
      <div className="input" style={{ marginLeft: '20px' }}>
        {getFieldDecorator('serialNumber', {
          initialValue: serialNumber,
        })(<Input style={{ textAlign: 'center', height: '50px', fontSize: '18px' }} placeholder="按订单号搜索" size="large" onSearch={handleSubmit} />)}
      </div>
      <div style={{ marginLeft: '20px' }}>
        <Button loading={buttonLoading} type="primary" size="large" style={{ width: '100px', height: '50px' }} onClick={handleSubmit}>搜索</Button>
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
