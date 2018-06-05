import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'

const List = ({ filter, location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '站点名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return <Link title="查看寄件详情" to={`/expressfeedetail?showName=${record.name}&idUser=${record.idUser}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>{text || '暂无'}</Link>
        }
        return <Link title="查看寄件详情" to={`/expressfeedetail?showName=${record.name}&idUser=${record.idUser}`}>{text || '暂无'}</Link>
      },
    }, {
      title: '支付宝',
      dataIndex: 'alipayPrice',
      key: 'alipayPrice',
      render: (text) => {
        return <span>{text ? `${text}元` : '0元'}</span>
      },
    }, {
      title: '微信',
      dataIndex: 'weChatPrice',
      key: 'weChatPrice',
      render: (text) => {
        return <span>{text ? `${text}元` : '0元'}</span>
      },
    }, {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      render: (text) => {
        return <span>{text ? `${text}元` : '0元'}</span>
      },
    }, {
      title: '现金',
      dataIndex: 'cash',
      key: 'cash',
      render: (text) => {
        return <span>{text ? `${text}元` : '0元'}</span>
      },
    }, {
      title: '收款失败金额',
      dataIndex: 'failPrice',
      key: 'failPrice',
      render: (text) => {
        return <span>{text ? `${text}元` : '0元'}</span>
      },
    }, {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      render: (text, record) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return <Link to={`/expressfeedetail?showName=${record.name}&idUser=${record.idUser}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>查看寄件详情</Link>
        }
        return <Link to={`/expressfeedetail?showName=${record.name}&idUser=${record.idUser}`}>查看寄件详情</Link>
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
