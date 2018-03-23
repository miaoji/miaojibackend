import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '单号',
      dataIndex: 'orderSn',
      key: 'orderSn'
    }, {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '金额',
      dataIndex: 'account',
      key: 'account',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '收款方式',
      dataIndex: 'payType',
      key: 'payType',
      render: (text) => {
        const repltext = {
          1: '支付宝',
          2: '微信',
          3: '余额',
          4: '现金'
        }
        return <span>{text ? repltext[text] : '未知'}</span>
      }
    }, {
      title: '收款状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const repltext = {
          success: '成功',
          wait: '等待',
          cancel: '交易取消',
          close: '交易关闭'
        }
        return <span>{repltext[text] || '未知'}</span>
      }
    }, {
      title: '快递状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => {
        const repltext = {
          101: '上架',
          103: '分派',
          301: '签收',
          1: '点单'
        }
        return <span>{repltext[text] || '未知'}</span>
      }
    }, {
      title: '操作人',
      dataIndex: 'realName',
      key: 'realName',
      render: (text) => {
        return <span>{text || '0'} 元</span>
      }
    }, {
      title: '日期',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return <span>{text}</span>
      },
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
}

export default List
