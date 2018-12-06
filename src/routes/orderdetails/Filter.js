import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Form, Button, Input } from 'antd'
import styles from './index.less'

const Filter = ({
  onFilterChange,
  filter,
  buttonLoading,
  isData,
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

  return (
    <div className={classnames({ [styles.filter]: true, [styles.isData]: !isData })} >
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
  isData: PropTypes.bool,
}

export default Form.create()(Filter)
