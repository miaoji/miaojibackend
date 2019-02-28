import React from 'react'
import PropTypes from 'prop-types'
import { Table, Spin } from 'antd'
import { Link } from 'dva/router'
import classnames from 'classnames'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const List = ({ onDeleteItem, expandedLoading, onEditItem, sonlist, isMotion, location, rowExpandList, ...tableProps }) => {
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
      title: '对接入库数',
      dataIndex: 'pourIn',
      key: 'pourIn',
      width: 100,
    }, {
      title: '未对接入库数',
      dataIndex: 'noPourIn',
      key: 'noPourIn',
      width: 100,
    }, {
      title: '对接出库数',
      dataIndex: 'pourOut',
      key: 'pourOut',
      width: 70,
      render: (text) => {
        return (<span>{text}</span>)
      },
    }, {
      title: '未对接出库数',
      dataIndex: 'noPourOut',
      key: 'noPourOut',
      width: 100,
      render: (text) => {
        return (<span>{text}</span>)
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
        className={classnames({ [styles.table]: true, [styles.motion]: false })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
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
  isMotion: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  sonlist: PropTypes.array,
  expandedLoading: PropTypes.bool,
  rowExpandList: PropTypes.array,
}

export default List
