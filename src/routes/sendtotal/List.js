import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { Link } from 'dva/router'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '站点名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        // return <span>{ text || '站点名暂无'}</span>
        return <Link to={`/mailprice?idUser=${record.idUser}`}>{text}</Link>
      }
    }, {
      title: '支付成功',
      dataIndex: 'success',
      key: 'success',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '等待支付',
      dataIndex: 'wait',
      key: 'wait',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '支付关闭',
      dataIndex: 'close',
      key: 'cloce',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    rows: tableProps.pagination.rows,
  }
console.log('getBodyWrapperProps', getBodyWrapperProps)
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
}

export default List
