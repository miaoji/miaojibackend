import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const List = ({ filter, location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '操作人',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '点货数量',
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
      render: (text, record) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return <Link to={`/backuporderbyuser?realName=${record.name}&mailtype=${filter.mailtype || '0'}&idUser=${filter.idUser}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>查看快件详情</Link>
        }
        return <Link to={`/backuporderbyuser?realName=${record.name}&mailtype=${filter.mailtype || '0'}&idUser=${filter.idUser}`}>查看快件详情</Link>
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    rows: tableProps.pagination.rows,
  }
  const getBodyWrapper = (body) => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

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
        getBodyWrapper={getBodyWrapper}
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
