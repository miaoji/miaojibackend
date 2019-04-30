import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table } from 'antd'

const SonTable = ({ record, list, filter }) => {
  console.log('filter', filter)
  const columns = [
    {
      title: '操作人',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '点单数量',
      dataIndex: 'ddtotal',
      key: 'ddtotal',
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '上架数量',
      dataIndex: 'sjtotal',
      key: 'sjtotal',
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '入柜数量',
      dataIndex: 'enterTank',
      key: 'enterTank',
      render: (text) => {
        return <span>{text || 0}</span>
      },
    }, {
      title: '签收数量',
      dataIndex: 'qstotal',
      key: 'qstotal',
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '补签数量',
      dataIndex: 'retroactive',
      key: 'retroactive',
      render: (text) => {
        return <span>{text || 0}</span>
      },
    }, {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: 140,
      render: (text, info) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return <Link to={`/orderbyuser?realName=${info.name}&mailtype=${filter.mailtype || '0'}&idUser=${record.idUser}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>查看快件详情</Link>
        }
        return <Link to={`/orderbyuser?realName=${info.name}&mailtype=${filter.mailtype || '0'}&idUser=${record.idUser}`}>查看快件详情</Link>
      },
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={list}
      pagination={false}
    />
  )
}

SonTable.propTypes = {
  record: PropTypes.object,
  list: PropTypes.array,
  filter: PropTypes.object,
}

export default SonTable
