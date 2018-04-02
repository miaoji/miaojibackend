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
      title: '品牌',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '单号',
      dataIndex: 'success',
      key: 'success',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '操作人',
      dataIndex: 'wait',
      key: 'wait',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '快递状态',
      dataIndex: 'close',
      key: 'cloce',
      render: (text, record) => {
        if (filter.startTime) {
          return <Link to={`/expressfeedetail?name=${record.name}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>{text || 0}元</Link>
        }
        return <Link to={`/expressfeedetail?name=${record.name}`}>{text || 0}元</Link>
      }
    }, {
      title: '金额',
      dataIndex: 'close12',
      key: 'cloce12',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '收款方式',
      dataIndex: 'close22',
      key: 'cloce22',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }, {
      title: '收款状态',
      dataIndex: 'close32',
      key: 'cloce32',
      render: (text) => {
        return <span>{text || 0} 元</span>
      }
    }
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
