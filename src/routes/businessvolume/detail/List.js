import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

const List = ({ location, ...tableProps }) => {
  const columns = [
    {
      title: '快递品牌',
      dataIndex: 'brand',
      key: 'brand',
      width: 100,
    }, {
      title: '快递单号',
      width: 160,
      dataIndex: 'orderSn',
      key: 'orderSn',
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  location: PropTypes.object.isRequired,
}

export default List
