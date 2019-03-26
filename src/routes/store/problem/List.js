import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { Table, Spin } from 'antd'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'

const List = ({ filter, location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'idUser',
      key: 'idUser',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '站点名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return <Link to={`/problemdetail?idUser=${record.idUser}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[0]._i}`}>{text || '暂无'}</Link>
        }
        return <Link to={`/problemdetail?idUser=${record.idUser}`}>{text || '暂无'}</Link>
      },
    }, {
      title: '站点地址',
      dataIndex: 'address',
      key: 'address',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '问题件数量',
      dataIndex: 'count',
      key: 'count',
      render: (text) => {
        return <span>{text || '暂无'}</span>
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
        expandedRowRender={(record) => {
          if (record.brandList && record.brandList.length === 0) {
            return (<div>
              <div style={{ margin: 0 }}>
                <div style={{ textAlign: 'left', margin: '10px' }}>
                  暂无相关数据
                </div>
              </div>
            </div>)
          }
          if (record.brandList) {
            return (<div className={classnames({ [styles.p]: true })}>
              {record.brandList.map((item) => {
                return (
                  <p style={{ textAlign: 'left', margin: '10px' }}>
                    {`快递品牌: ${item.brand}, 问题件数量: ${item.count}`}
                  </p>
                )
              })}
            </div>)
          }
          return (
            <div>
              <Spin />
            </div>
          )
        }}
        rowKey={record => record.idUser}
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
