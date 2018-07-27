import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'dva/router'
import { Table } from 'antd'
import './SonTable.less'

const SonTable = ({
  list,
  // filter
}) => {
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '帐号',
      width: 160,
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '帐号名称',
      width: 160,
      dataIndex: 'realName',
      key: 'realName',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '店铺级别',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: () => {
        return (<span>子账号</span>)
      },
    }, {
      title: '状态',
      dataIndex: 'isdelete',
      key: 'isdelete',
      width: 70,
      render: (text) => {
        return (<span>{text === 0
          ? '禁用'
          : '启用'}</span>)
      },
    },
  ]

  return (
    <Table
      className="SonTable"
      columns={columns}
      dataSource={list}
      pagination={false}
    />
  )
}

SonTable.propTypes = {
  list: PropTypes.array,
  // filter: PropTypes.object,
}

export default SonTable
