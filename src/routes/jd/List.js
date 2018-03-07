import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const List = ({ list }) => {
  return (
    <div>
      <br/>
      <h1>单号池剩余单号数量为 <b>{list}</b></h1>
    </div>
  )
}

List.propTypes = {
  list: PropTypes.str,
}

export default List
