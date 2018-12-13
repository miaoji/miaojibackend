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
    fields.name = fields.name.trim()
    if (!fields.name) return
    onFilterChange(fields)
  }

  const { name } = filter

  return (
    <div className={styles.filter} >
      <div className={styles.filter_title}><span className="icon_line" />分派人查询 : </div>
      <div className="input" style={{ marginLeft: '20px' }}>
        {getFieldDecorator('name', {
          initialValue: name,
        })(<Search onSearch={handleSubmit} className={styles.filter_input} placeholder="按分派人姓名或id搜索" size="large" onPressEnter={handleSubmit} />)}
      </div>
      <div style={{ marginLeft: '20px' }}>
        <Button className={styles.filter_button} loading={buttonLoading} type="primary" size="large" onClick={handleSubmit}>搜索</Button>
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
