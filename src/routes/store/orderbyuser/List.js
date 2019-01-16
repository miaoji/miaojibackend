import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Table } from 'antd'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'

const List = ({ filter, location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '快递品牌',
      dataIndex: 'brand',
      key: 'brand',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '单号',
      dataIndex: 'orderSn',
      key: 'orderSn',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '快递状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => {
        const replText = {
          1: '点货',
          101: '到件',
          102: '上架',
          103: '分派',
          201: '问题件',
          202: '移库',
          299: '问题件',
          305: '签收',
          303: '退回',
          304: '补签',
        }
        return <span>{replText[text]}</span>
      },
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return <span>{text || '暂无'}</span>
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
