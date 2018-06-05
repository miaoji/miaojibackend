import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import moment from 'moment'
import { Table } from 'antd'
import './SonTable.less'

const SonTable = ({ list, filter }) => {
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
      title: '店铺名称',
      dataIndex: 'name',
      key: 'name',
      width: 170,
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '店铺级别',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (text) => {
        return (<span>{text === '0'
          ? '主帐号'
          : '子帐号'}</span>)
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
    }, {
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
      width: 150,
      render: (text) => {
        const createtime = text ? moment(text / 1).format('YYYY-MM-DD') : '未知时间'
        return <span>{createtime}</span>
      },
    },
    {
      title: '操作人',
      key: 'operation',
      width: 150,
      render: (text, record) => {
        if (filter.startTime) {
          return <Link to={`/storeUserDetail?idUser=${record.id}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>查看操作人详情</Link>
        }
        return <Link to={`/storeUserDetail?idUser=${record.id}`}>查看操作人详情</Link>
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
  filter: PropTypes.object,
}

export default SonTable
