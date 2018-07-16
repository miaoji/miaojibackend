import React from 'react'
import PropTypes from 'prop-types'
import { Table, Spin } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import { Link } from 'dva/router'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import SonTable from './SonTable'

const List = ({ filter, onDeleteItem, onVersionSwitching, columnslist, onEditItem, sonlist, isMotion, location, rowLoading, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        onVersionSwitching(record)
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
      width: 100,
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '帐号',
      width: 160,
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '店铺名称',
      dataIndex: 'name',
      key: 'name',
      width: 170,
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '店铺级别',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (text) => {
        return (<span>{text === '0'
          ? '主帐号'
          : '子帐号'}</span>)
      },
    }, {
      title: '状态',
      dataIndex: 'isdelete',
      key: 'isdelete',
      width: 70,
      render: (text) => {
        return (<span>{text === 0
          ? '禁用'
          : '启用'}</span>)
      },
    }, {
      title: '通讯费',
      dataIndex: 'communicateFee',
      key: 'communicateFee',
      width: 100,
      render: (text) => {
        return (<span>{text || 0}元</span>)
      },
    }, {
      title: 'APP版本',
      dataIndex: 'isBeta',
      key: 'isBeta',
      width: 100,
      render: (text) => {
        const replText = {
          0: '正式版',
          1: '点货版',
        }
        return (<span>{replText[text]}</span>)
      },
    }, {
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
      width: 150,
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
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改通讯费' }, { key: '2', name: '版本切换' }]} />
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
        expandRowByClick
        className={classnames({ [styles.table]: true, [styles.motion]: false })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        /* eslint react/jsx-no-duplicate-props: 'off' */
        expandRowByClick={false}
        // expandedRowRender={() => <p>123123123</p>}
        rowKey={record => record.id}
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
          return <SonTable handleMenuClick={handleMenuClick} record={record} list={sonlist} filter={filter} />
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
  columnslist: PropTypes.array.isRequired,
  onVersionSwitching: PropTypes.func.isRequired,
  filter: PropTypes.object,
  sonlist: PropTypes.array,
  rowLoading: PropTypes.bool,
}

export default List
