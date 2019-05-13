import React from 'react'
import PropTypes from 'prop-types'
import { Cascader, Form } from 'antd'
import cityData from 'utils/city'
import { storeuserEditLocation } from 'utils/processing'

const city = cityData.map((item) => {
  return storeuserEditLocation(item)
})


const Location = ({ handleChange, ...props }) => {
  const filterLocation = (inputValue, path) => {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1))
  }
  const { initialValue } = props['data-__meta']
  const onChange = (e) => {
    handleChange(e.toString())
  }

  let value = initialValue ? initialValue.split(',') : []

  return (<Cascader
    {...props}
    showSearch={{ filterLocation }}
    value={value}
    // defaultValue={value}
    style={{ width: '100%' }}
    placeholder="按站点地址搜索"
    changeOnSelect
    allowClear
    options={city}
    onChange={onChange}
    expandTrigger="hover"
  />)
}


Location.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.array,
  'data-__meta': PropTypes.object,
}

export default Form.create()(Location)
