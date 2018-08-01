import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import './SonTable.less'
import styles from './List.less'

const SonTable = ({
  list,
}) => {
  console.log('list', list)
  const columns = [
    {
      title: '点货数',
      children: [{
        title: '中通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '圆通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '韵达',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '汇通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '天天',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }],
    }, {
      title: '入库数',
      children: [{
        title: '中通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '圆通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '韵达',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '汇通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '天天',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }],
    }, {
      title: '签收数',
      children: [{
        title: '中通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '圆通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '韵达',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '汇通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '天天',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }],
    }, {
      title: '退回数',
      children: [{
        title: '中通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '圆通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '韵达',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '汇通',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '天天',
        width: 160,
        dataIndex: 'mobile',
        key: 'mobile',
      }],
    },
  ]

  return (
    <Table
      className={classnames({ [styles.table]: true })}
      bordered
      size="middle"
      columns={columns}
      dataSource={list}
      pagination={false}
    />
  )
}

SonTable.propTypes = {
  list: PropTypes.array,
}

export default SonTable
