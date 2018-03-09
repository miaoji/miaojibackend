import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {

  const columns = [
    {
      title: '站点名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '单号',
      dataIndex: 'orderSn',
      key: 'orderSn',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '收款类型',
      dataIndex: 'feeType',
      key: 'feeType',
      filters: [
        { text: '寄件费', value: 13 },
        { text: '代收货款', value: 8 },
        { text: '到付费', value: 9 },
      ],
      render: (text) => {
        const repltext = {
          13: '寄件费',
          8: '代收货款',
          9: '到付费'
        }
        return <span>{text ? repltext[text] : '未知'}</span>
      }
    }, {
      title: '费用',
      dataIndex: 'fee',
      key: 'fee',
      render: (text) => {
        return <span>{text || 0}元</span>
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
          4: '现金',
          0: '未知'
        }
        return <span>{replText[text || 0]}</span>
      }
    }, {
      title: '支付状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '成功', value: 'success' },
        { text: '关闭', value: 'close' },
      ],
      render: (text) => {
        const repltext = {
          success: '成功',
          close: '关闭',
          wait: '等待'
        }
        return <span>{text ? repltext[text] : '未知'}</span>
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
