import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import styles from './List.less'

const List = ({ filter, location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '站点名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{(text || text === 0) ? text : '暂无'}</span>
      },
    }, {
      title: '上架量',
      dataIndex: 'blackListsj',
      key: 'blackListsj',
      render: (text) => {
        return <span>{(text || text === 0) ? text : '暂无'}</span>
      },
    }, {
      title: '签收量',
      dataIndex: 'blackListqs',
      key: 'blackListqs',
      render: (text) => {
        return <span>{(text || text === 0) ? text : '暂无'}</span>
      },
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text) => {
        return <span>{(text || text === 0) ? text : '暂无'}</span>
      },
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
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
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
  filter: PropTypes.object,
}

export default List
