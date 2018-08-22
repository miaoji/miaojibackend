import React from 'react'
import PropTypes from 'prop-types'
import { Table, Spin } from 'antd'
import { Link } from 'dva/router'
import classnames from 'classnames'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import SonTable from './SonTable'

const List = ({ filter, location, sonlist, onEditItem, onDeleteItem, rowLoading, ...tableProps }) => {
  const columns = [
    {
      title: '站点名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return <Link to={`/operatorbyname?mailtype=${filter.mailtype || '0'}&idUser=${record.idUser}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>{text}</Link>
        }
        return <Link to={`/operatorbyname?idUser=${record.idUser}&mailtype=${filter.mailtype || '0'}`}>{text}</Link>
      },
    }, {
      title: '点单数量',
      dataIndex: 'ddtotal',
      key: 'ddtotal',
      render: (text) => {
        return <span>{text || 0}</span>
      },
    }, {
      title: '上架数量',
      dataIndex: 'sjtotal',
      key: 'sjtotal',
      render: (text) => {
        return <span>{text || 0}</span>
      },
    }, {
      title: '签收数量',
      dataIndex: 'qstotal',
      key: 'qstotal',
      render: (text) => {
        return <span>{text || 0}</span>
      },
    }, {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: 140,
      render: (text, record) => {
        if (!record.name) {
          return <span>该站点无法操作</span>
        }
        if (filter.createTime && filter.createTime.length > 0) {
          return <Link to={`/operatorbyname?mailtype=${filter.mailtype || '0'}&idUser=${record.idUser}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>查看操作人详情</Link>
        }
        return <Link to={`/operatorbyname?idUser=${record.idUser}&mailtype=${filter.mailtype || '0'}`}>查看操作人详情</Link>
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
        rowKey={record => record.idUser}
        getBodyWrapper={getBodyWrapper}
        expandedRowRender={(record) => {
          if (rowLoading) {
            return <Spin />
          }
          if (sonlist && sonlist.length === 0) {
            return (<div>
              <div style={{ margin: 0 }}>
                <div style={{ textAlign: 'center', margin: '10px', color: 'red' }}>
                  暂无相关数据
                </div>
              </div>
            </div>)
          }
          return <SonTable record={record} list={sonlist} filter={filter} />
        }}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
  filter: PropTypes.object,
  sonlist: PropTypes.array,
  rowLoading: PropTypes.bool,
}

export default List
