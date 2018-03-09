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
        return <Link to={`/storeallot?idUser=${record.idUser}`}>{text}</Link>
      }
    }, {
      title: '分派数量',
      dataIndex: 'total103',
      key: 'total103',
      render: (text) => {
        return <span>{text || '暂无'}</span>
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
}

export default List
