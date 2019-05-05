import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Table } from 'antd'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'

const List = ({ mailtype, filter, location, onEditItem, onDeleteItem, ...tableProps }) => {
  console.log('mailtype', mailtype)
  let columns = [
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
          100: '预约',
          101: '到件',
          102: '上架',
          103: '分派',
          104: '入柜',
          201: '问题件',
          202: '移库',
          299: '问题件',
          305: '签收',
          303: '退回',
          304: '补签',
        }
        return <span>{replText[text]}</span>
      },
    },
  ]

  if (mailtype === 3) {
    columns = [...columns, {
      title: '收款金额',
      dataIndex: 'fee',
      key: 'fee',
      render: (text) => {
        return <span>{text ? `¥${text}` : '暂无'}</span>
      },
    }, {
      title: '收款状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const realText = {
          success: '成功',
          wait: '等待',
          cancel: '交易取消',
          close: '交易关闭',
          false: '交易失败',
          refuse: '审核被拒绝',
        }
        return <span>{text ? realText[text] : '暂无'}</span>
      },
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }]
  } else {
    columns = [...columns, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }]
  }

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
  mailtype: PropTypes.number,
}

export default List
