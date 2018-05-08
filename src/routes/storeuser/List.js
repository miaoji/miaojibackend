import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { Link } from 'dva/router'
import { time } from '../../utils'


const List = ({ filter, toStoreorderinfo, onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => {
        return <span>{text}</span>
      }
    }, {
      title: '帐号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '店铺名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '店铺级别',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <span>{text === '0'
        ? '主帐号'
        : '子帐号'}</span>,
    }, {
      title: '状态',
      dataIndex: 'isdelete',
      key: 'isdelete',
      render: (text) => <span>{text === 0
        ? '禁用'
        : '启用'}</span>,
    }, {
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
      render: (text) => {
        const createtime = time.formatTime(text)
        return <span>{createtime}</span>
      },
    },
    {
      title: '操作',
      key: 'operation',
      width: 150,
      render: (text, record) => {
        if (filter.startTime) {
          return <Link to={`/storeUserDetail?idUser=${record.id}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>查看操作人详情</Link>
        }
        return <Link to={`/storeUserDetail?idUser=${record.id}`}>查看操作人详情</Link>
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

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
  toStoreorderinfo: PropTypes.func,
  filter: PropTypes.object
}

export default List
