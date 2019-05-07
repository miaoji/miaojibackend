import React from 'react'
import PropTypes from 'prop-types'
import { Table, Spin, Modal } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import { Link } from 'dva/router'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import SonTable from './SonTable'

const initMenuOption = (auth) => {
  const menuOptions = []
  Object.keys(auth).forEach((i) => {
    let tmp = null
    switch (i) {
      case 'del':
        tmp = { key: '4', name: '删除用户' }
        break
      case 'resetPWD':
        tmp = { key: '5', name: '重置用户密码' }
        break
      case 'update':
        tmp = { key: '1', name: '修改通讯费' }
        break
      case 'version':
        tmp = { key: '2', name: '版本切换' }
        break
      default:
        break
    }
    if (tmp) {
      menuOptions.push(tmp)
    }
  })
  return menuOptions
}

const confirm = Modal.confirm

const List = ({ auth, onResetPWDClick, filter, onDeleteAppUser, onMonitorClick, onDeleteItem, onVersionSwitching, columnslist, onEditItem, sonlist, isMotion, location, rowLoading, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        onVersionSwitching(record)
        break
      case '3':
        onMonitorClick(record)
        break
      case '4':
        confirm({
          title: <p>确定要删除<span style={{ color: 'red' }}>{record.name}</span>这个门店吗?</p>,
          onOk() {
            onDeleteAppUser(record.id)
          },
        })
        break
      case '5':
        onResetPWDClick(record)
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
      render: (_, record) => {
        return <span>{`${record.province || ''}/${record.city || ''}/${record.district || '/'}`}</span>
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
          0: '简化版',
          1: '正式版',
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
          return <Link to={`/storeUserDetail?idUser=${record.id}&startTime=${filter.startTime}&endTime=${filter.endTime}`}>查看详情</Link>
        }
        return <Link to={`/storeUserDetail?idUser=${record.id}`}>查看详情</Link>
      },
    },
    {
      title: '操作',
      key: 'operations',
      width: 100,
      render: (_, record) => {
        const menuOptions = initMenuOption(auth)
        if (menuOptions.length) {
          return (<DropOption onMenuClick={e => handleMenuClick(record, e)}
            menuOptions={menuOptions}
          />)
        }
        return <span>/</span>
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
  onVersionSwitching: PropTypes.func.isRequired,
  onMonitorClick: PropTypes.func.isRequired,
  onResetPWDClick: PropTypes.func,
  onDeleteAppUser: PropTypes.func.isRequired,
  isMotion: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  columnslist: PropTypes.array.isRequired,
  filter: PropTypes.object,
  sonlist: PropTypes.array,
  rowLoading: PropTypes.bool,
  auth: PropTypes.object,
}

export default List
