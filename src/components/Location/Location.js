import React from 'react'
import PropTypes from 'prop-types'
import { Cascader, Form } from 'antd'
import city from 'utils/city'

const Location = ({ handleChange, value, ...props }) => {
  console.log('props', props)
  const filterLocation = (inputValue, path) => {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1))
  }

  return (<Cascader
    {...props}
    showSearch={{ filterLocation }}
    size="large"
    defaultValue={value}
    style={{ width: '100%' }}
    placeholder="按站点地址搜索"
    changeOnSelect
    allowClear
    options={city}
    onChange={e => handleChange(e)}
    expandTrigger="hover"
  />)
}


Location.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.array,
}

export default Form.create()(Location)
