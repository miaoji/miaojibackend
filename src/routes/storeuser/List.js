import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import { Link } from 'dva/router'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'

const List = ({ filter, onDeleteItem, queryColumnslist, columnslist, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      default:
        break
    }
  }
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => {
        return <span>{text}</span>
      },
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
      },
    }, {
      title: '店铺级别',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        return (<span>{text === '0'
          ? '主帐号'
          : '子帐号'}</span>)
      },
    }, {
      title: '状态',
      dataIndex: 'isdelete',
      key: 'isdelete',
      render: (text) => {
        return (<span>{text === 0
          ? '禁用'
          : '启用'}</span>)
      },
    }, {
      title: '通讯费',
      dataIndex: 'communicateFee',
      key: 'communicateFee',
      render: (text) => {
        return (<span>{text || 0}元</span>)
      },
    }, {
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
      render: (text) => {
        const createtime = text ? moment(text / 1).format('YYYY-MM-DD') : '未知时间'
        return <span>{createtime}</span>
      },
    },
    {
      title: '操作人',
      key: 'operation',
      width: 150,
      render: (text, record) => {
        if (filter.startTime) {
          return <Link to={`/storeUserDetail?idUser=${record.id}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>查看操作人详情</Link>
        }
        return <Link to={`/storeUserDetail?idUser=${record.id}`}>查看操作人详情</Link>
      },
    },
    {
      title: '操作',
      key: 'operations',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改通讯费' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }
  const onExpandedRowsChange = () => {
    queryColumnslist()
  }
  return (
    <div>
      <Table
        {...tableProps}
        onExpandedRowsChange={onExpandedRowsChange}
        expandRowByClick
        className={classnames({ [styles.table]: true, [styles.motion]: false })}
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
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  isMotion: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  columnslist: PropTypes.array.isRequired,
  queryColumnslist: PropTypes.func.isRequired,
  filter: PropTypes.object,
}

export default List
