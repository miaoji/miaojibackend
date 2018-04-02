import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { Link } from 'dva/router'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'

const List = ({ filter, location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '操作人',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        if (filter.startTime) {
          return <Link to={`/orderbyuser?name=${record.name}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>{text || '暂无站点名'}</Link>
        }
        return <Link to={`/orderbyuser?name=${record.name}`}>{text || '暂无站点名'}</Link>
      }
    }, {
      title: '点单数量',
      dataIndex: 'success',
      key: 'success',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '上架数量',
      dataIndex: 'wait',
      key: 'wait',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '分派数量',
      dataIndex: 'close',
      key: 'cloce',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '签收数量',
      dataIndex: 'close1',
      key: 'cloce1',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    rows: tableProps.pagination.rows,
  }
  const getBodyWrapper = body => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

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
