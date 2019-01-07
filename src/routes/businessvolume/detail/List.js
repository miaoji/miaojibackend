import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { config } from 'utils'

const { orderTypeForBusiness } = config

const List = ({ location, ...tableProps }) => {
  const columns = [
    {
      title: '快递品牌',
      dataIndex: 'brand',
      key: 'brand',
    }, {
      title: '操作人',
      dataIndex: 'orderSn',
      key: 'orderSn',
    }, {
      title: '快递状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => {
        return <span>{orderTypeForBusiness[text]}</span>
      },
    }, {
      title: '快递单号',
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
