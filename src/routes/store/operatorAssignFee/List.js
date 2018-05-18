import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'

const List = ({ filter, location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '单号',
      dataIndex: 'orderSn',
      key: 'orderSn',
      render: (text) => {
        return <span>{text || 0}</span>
      }
    }, {
      title: '操作人',
      dataIndex: 'realName',
      key: 'realName',
      render: (text) => {
        return <span>{text || 0}</span>
      }
    }, {
      title: '快递状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => {
        const real = {
          1: '点单',
          101: '上架',
          103: '分派',
          301: '签收',
        }
        return <span>{text ? real[text] : '暂无'}</span>
      }
    }, {
      title: '金额',
      dataIndex: 'account',
      key: 'account',
      render: (text) => {
        return <span>{text}</span>
      }
    }, {
      title: '收款方式',
      dataIndex: 'payType',
      key: 'payType',
      render: (text) => {
        const replText = {
          1: '支付宝',
          2: '微信',
          3: '余额',
          4: '支付宝',
        }
        return <span>{replText[text]}</span>
      }
    }, {
      title: '收款状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const replText = {
          success: '成功',
          close: '取消',
          waiting: '等待'
        }
        return <span>{replText[text]}</span>
      }
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
