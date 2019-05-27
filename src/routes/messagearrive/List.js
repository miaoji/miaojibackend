import React from 'react'
import PropTypes from 'prop-types'
import { Table, Spin } from 'antd'
import { Link } from 'dva/router'
import classnames from 'classnames'
import styles from './List.less'

const Text = ({ children, color }) => {
  return <span style={{ color: color || '#333' }}>{children}</span>
}

Text.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
}

const List = ({ onDeleteItem, expandedLoading, onEditItem, sonlist, location, rowExpandList, ...tableProps }) => {
  const filter = location.query
  const timeParams = filter.createTime && filter.createTime.length > 0 ? `&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}` : ''
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text) => {
        return <Link to={`/dockingdetail?idUser=${text}${timeParams}`}>{text}</Link>
      },
    }, {
      title: '站点名称',
      dataIndex: 'name',
      key: 'name',
      width: 170,
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '站点地址',
      dataIndex: 'address',
      key: 'address',
      width: 170,
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '到达数',
      dataIndex: 'a',
      key: 'a',
      width: 100,
      render: (text) => {
        return <Text color="#67C23A">{text}</Text>
      },
    }, {
      title: '未到达数',
      dataIndex: 'b',
      key: 'b',
      width: 100,
      render: (text) => {
        return <Text color="#F56C6C">{text}</Text>
      },
    }, {
      title: '发出数',
      dataIndex: 'pourOut',
      key: 'pourOut',
      width: 100,
      render: (_, record) => {
        const { a, b } = record
        return (<Text color="#409EFF">{a + b}</Text>)
      },
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: false })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        expandedRowRender={() => {
          if (expandedLoading) {
            return <Spin />
          }
          if (rowExpandList.length === 0) {
            return <span>暂无数据</span>
          }
          return (<div className={styles.rowRender}>
            {
              rowExpandList.map((item) => {
                return (<div>
                  <p>快递品牌:<span>{item.brand}</span></p>
                  <p>对接入库数:<span>{item.pourIn}</span></p>
                  <p>未对接入库数:<span>{item.noPourIn}</span></p>
                  <p>对接出库数:<span>{item.pourOut}</span></p>
                  <p>未对接出库数:<span>{item.noPourOut}</span></p>
                  <p><Link to={`/dockingdetail?idBrand=${item.idBrand}&idUser=${item.id}${timeParams}`}>查看明细</Link></p>
                </div>)
              })
            }
          </div>)
        }}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  sonlist: PropTypes.array,
  expandedLoading: PropTypes.bool,
  rowExpandList: PropTypes.array,
}

export default List
