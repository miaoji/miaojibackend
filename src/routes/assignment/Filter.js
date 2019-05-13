import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd'
import styles from './index.less'
import { DateRange } from '../../components'
import { handleFields, defaultTime } from '../../utils'

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
  const { name, createTime } = filter

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

  const inputClear = (e, key) => {
    if (Object.keys(e).length === 0) {
      handleChange(key, '')
    }
  }

  return (
    <div>
      <div className={styles.filter} >
        <div className={styles.filter_title}><span className="icon_line" />时间筛选 : </div>
        <div style={{ width: '400px', marginLeft: '40px' }}>
          {getFieldDecorator('createTime', { initialValue: createTime })(
            <DateRange onChange={handleChange.bind(null, 'createTime')} />
          )}
        </div>
      </div>
      <div className={styles.filter} >
        <div className={styles.filter_title}><span className="icon_line" />分派人查询 : </div>
        <div className="input">
          {getFieldDecorator('name', {
            initialValue: name,
          })(<Search onChange={e => inputClear(e, 'name')} allowClear onSearch={handleSubmit} className={styles.filter_input} placeholder="按分派人姓名或id搜索" onPressEnter={handleSubmit} />)}
        </div>

        <div style={{ marginLeft: '20px' }}>
          <Button className={styles.filter_button} loading={buttonLoading} type="primary" onClick={handleSubmit}>搜索</Button>
        </div>
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
