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
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => {
        const repltext = {
          101: '上架',
          103: '分派'
        }
        return <span>{text ? repltext[text] : '未知'}</span>
      }
    }, {
      title: '快递类型',
      dataIndex: 'mailtype',
      key: 'mailtype',
      render: (text) => {
        const repltext = {
          0: '普通件',
          1: '到付件',
          2: '代收货款件'
        }
        return <span>{repltext[text] || '未知'}</span>
      }
    }, {
      title: '金额',
      dataIndex: 'account',
      key: 'account',
      render: (text) => {
        return <span>{text || '0'} 元</span>
      }
    }, {
      title: '分派人',
      dataIndex: 'cname',
      key: 'cname',
      render: (text) => {
        return <span>{text || '暂无'}</span>
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
