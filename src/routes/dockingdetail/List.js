import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

const orderTypeForBusiness = {
  101: '入库',
  103: '入库',
  104: '入库',
  305: '出库',
  302: '出库',
  304: '出库',
  306: '出库',
}

const orderAccessFilter = {
  1: '对接失败',
  2: '对接失败',
  3: '对接失败',
  5: '对接失败',
  4: '对接成功',
}

const List = ({ location, ...tableProps }) => {
  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderSn',
      key: 'orderSn',
    },
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
      render: (text) => {
        return <span>{orderAccessFilter[text]}</span>
      },
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
