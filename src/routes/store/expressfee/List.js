import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'

const List = ({ filter, location, onLink, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        if (filter.createTime && filter.createTime.length > 0) {
          onLink({
            path: '/expressfeedetail',
            payload: {
              showName: record.name,
              idUser: record.idUser,
              createTime: [filter.createTime[0]._i, filter.createTime[1]._i],
            },
          })
        } else {
          onLink({
            path: '/expressfeedetail',
            payload: {
              showName: record.name,
              idUser: record.idUser,
            },
          })
        }
        break
      case '2':
        if (filter.createTime && filter.createTime.length > 0) {
          onLink({
            path: '/storeUserDetail',
            payload: {
              idUser: record.idUser,
              showName: record.name,
              createTime: [filter.createTime[0]._i, filter.createTime[1]._i],
            },
          })
        } else {
          onLink({
            path: '/storeUserDetail',
            payload: {
              showName: record.name,
              idUser: record.idUser,
            },
          })
        }
        break
      default:
        break
    }
  }
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
      title: '收款成功(合计)',
      dataIndex: 'amount ',
      key: 'amount ',
      render: (text, record) => {
        const amount = record.alipayPrice + record.weChatPrice + record.balance + record.cash
        return <span>{amount ? `${amount.toFixed(2)}元` : '0元'}</span>
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
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '寄件详情' }, { key: '2', name: '操作人详情' }]} />
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
  location: PropTypes.object,
  filter: PropTypes.object,
  onLink: PropTypes.func,
}

export default List
