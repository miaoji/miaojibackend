import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Table } from 'antd'

const SonTable = ({ record, list, filter }) => {
  console.log('record', record)
  console.log('list', list)
  const columns = [
    {
      title: '操作人',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '点单数量',
      dataIndex: 'ddtotal',
      key: 'ddtotal',
      render: (text) => {
        return <span>{text}</span>
      }
    }, {
      title: '上架数量',
      dataIndex: 'sjtotal',
      key: 'sjtotal',
      render: (text) => {
        return <span>{text}</span>
      }
    }, {
      title: '签收数量',
      dataIndex: 'qstotal',
      key: 'qstotal',
      render: (text) => {
        return <span>{text}</span>
      }
    }, {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: 140,
      render: (text, info) => {
        if (filter.startTime) {
          return <Link target={'_blank'} to={`/orderbyuser?realName=${info.name}&mailtype=${filter.mailtype || '0'}&idUser=${record.idUser}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>查看快件详情</Link>
        }
        return <Link target={'_blank'} to={`/orderbyuser?realName=${info.name}&mailtype=${filter.mailtype || '0'}&idUser=${record.idUser}`}>查看快件详情</Link>
      }
    }
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
