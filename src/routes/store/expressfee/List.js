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
      title: '站点名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '支付宝',
      dataIndex: 'AlipayPrice',
      key: 'AlipayPrice',
      render: (text, record) => {
        if (filter.startTime) {
          return <Link to={`/expressfeedetail?payType=1&name=${record.name}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>{text || 0}元</Link>
        }
        return <Link to={`/expressfeedetail?payType=1&name=${record.name}`}>{text || 0}元</Link>
      }
    }, {
      title: '微信',
      dataIndex: 'WeChatPrice',
      key: 'WeChatPrice',
      render: (text, record) => {
        if (filter.startTime) {
          return <Link to={`/expressfeedetail?payType=2&name=${record.name}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>{text || 0}元</Link>
        }
        return <Link to={`/expressfeedetail?payType=2&name=${record.name}`}>{text || 0}元</Link>
      }
    }, {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      render: (text, record) => {
        if (filter.startTime) {
          return <Link to={`/expressfeedetail?payType=3&name=${record.name}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>{text || 0}元</Link>
        }
        return <Link to={`/expressfeedetail?payType=3&name=${record.name}`}>{text || 0}元</Link>
      }
    }, {
      title: '现金',
      dataIndex: 'cash',
      key: 'cash',
      render: (text, record) => {
        if (filter.startTime) {
          return <Link to={`/expressfeedetail?payType=4&name=${record.name}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>{text || 0}元</Link>
        }
        return <Link to={`/expressfeedetail?payType=4&name=${record.name}`}>{text || 0}元</Link>
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
