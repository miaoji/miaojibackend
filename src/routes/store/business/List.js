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
      title: '点单数量',
      dataIndex: 'ddtotal',
      key: 'ddtotal',
      render: (text) => {
        return <span>{text || 0}</span>
      }
    }, {
      title: '上架数量',
      dataIndex: 'sjtotal',
      key: 'sjtotal',
      render: (text) => {
        return <span>{text || 0}</span>
      }
    }, {
      title: '签收数量',
      dataIndex: 'qstotal',
      key: 'qstotal',
      render: (text) => {
        return <span>{text || 0}</span>
      }
    }, {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: 140,
      render: (text, record) => {
        if (!record.name) {
          return <span>该站点无法操作</span>
        }
        if (filter.startTime) {
          return <Link to={`/operatorbyname?mailtype=${filter.mailtype || '0'}&idUser=${record.idUser}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>查看操作人详情</Link>
        }
        return <Link to={`/operatorbyname?idUser=${record.idUser}&mailtype=${filter.mailtype || '0'}`}>查看操作人详情</Link>
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
