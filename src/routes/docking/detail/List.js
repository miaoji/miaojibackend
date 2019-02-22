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
      title: '站点名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '快递状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => {
        return <span>{orderTypeForBusiness[text]}</span>
      },
    }, {
      title: '对接状态',
      dataIndex: 'access',
      key: 'access',
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
        rowKey={record => record.key}
      />
    </div>
  )
}

List.propTypes = {
  location: PropTypes.object.isRequired,
}

export default List
