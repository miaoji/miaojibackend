import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import moment from 'moment'
import styles from './List.less'

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const columns = [
    {
      title: '流水号',
      dataIndex: 'orderId',
      key: 'OrderId',
      render: (text) => {
        return <span>{text || '空'}</span>
      },
    }, {
      title: '金额',
      dataIndex: 'price',
      key: 'price',
      render: (text) => {
        return <span>￥{text}</span>
      },
    }, {
      title: '充值人',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '空'}</span>
      },
    }, {
      title: '充值状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const replTexy = {
          success: '成功',
          wait: '等待',
          cancel: '交易取消',
          close: '交易关闭',
        }
        return (<span>{replTexy[text]}</span>)
      },
    }, {
      title: '充值类型',
      dataIndex: 'dealInfo',
      key: 'dealInfo',
      render: (text) => {
        const replTexy = {
          4: '购买通讯费',
          6: '购买通讯费',
        }
        return (<span>{replTexy[text] || '暂无'}</span>)
      },
    }, {
      title: '充值时间',
      dataIndex: 'createtime',
      key: 'createtime',
      render: (text) => {
        return <span>{text ? moment.unix(text / 1000).format('YYYY-MM-DD HH:mm:ss') : '未知时间'}</span>
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 767 }}
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
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
