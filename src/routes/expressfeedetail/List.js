import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const List = ({ filter, location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '站点地区',
      dataIndex: 'city',
      key: 'city',
      render: (text, record) => {
        return <span>{`${record.province}/${record.city}/${record.district}`}</span>
      },
    }, {
      title: '站点名',
      dataIndex: 'showName',
      key: 'showName',
      render: () => {
        return <span>{filter.showName}</span>
      },
    }, {
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
      title: '收款方式',
      dataIndex: 'payType',
      key: 'payType',
      render: (text) => {
        const replText = {
          1: '支付宝',
          2: '微信',
          3: '余额',
          4: '现金',
        }
        return <span>{text ? replText[text] : '暂无'}</span>
      },
    }, {
      title: '完成状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const replText = {
          success: '成功',
          wait: '等待',
          close: '关闭',
        }
        return <span>{text ? replText[text] : '暂无'}</span>
      },
    }, {
      title: '金额',
      dataIndex: 'fee',
      key: 'fee',
      render: (text) => {
        return <span>{text || '0'}元</span>
      },
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
