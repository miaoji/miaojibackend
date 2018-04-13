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
      title: '派件量',
      dataIndex: 'sendPiecesNumber',
      key: 'sendPiecesNumber',
      render: (text) => {
        return <span>{text || 0}</span>
      }
    }, {
      title: '派件金额',
      dataIndex: 'sendPiecesPrice',
      key: 'sendPiecesPrice',
      render: (text) => {
        return <span>{text || 0}</span>
      }
    }, {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: 140,
      render: (text, record) => {
        if (filter.startTime) {
          return <Link to={`/operatorAssignFee?idUser=${record.idUser}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>查看操作人派件金额</Link>
        }
        return <Link to={`/operatorAssignFee?idUser=${record.idUser}`}>查看操作人派件金额</Link>
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