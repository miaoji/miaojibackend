import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { Link } from 'dva/router'
import classnames from 'classnames'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const List = ({ onDeleteItem, tabLoading, onEditItem, sonlist, isMotion, location, ...tableProps }) => {
  const filter = location.query
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text, record) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return <Link to={`/dockingdetail?idBrand=${record.idBrand}&idUser=${text}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>{text}</Link>
        }
        return <Link to={`/dockingdetail?idBrand=${record.idBrand}&idUser=${text}`}>{text}</Link>
        // return <a rel="noopener noreferrer" target="_blank" href={`/dockingdetail?idUser=${text}&createTime=${createTime[0]}&createTime=${createTime[1]}`}>{text}</a>
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
      title: '快递品牌',
      width: 160,
      dataIndex: 'brand',
      key: 'brand',
      render: (text) => {
        return <span>{text}</span>
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
        rowKey={record => record.key}
        getBodyWrapper={getBodyWrapper}
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
  tabLoading: PropTypes.bool,
}

export default List
