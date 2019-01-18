import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
// import moment from 'moment'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
// import { isSuperAdmin } from '../../utils'

const confirm = Modal.confirm

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除门店绑定信息吗?',
          onOk() {
            onDeleteItem(record)
          },
        })
        break
      default:
        break
    }
  }

  const columns = [
    {
      title: '站点ID',
      dataIndex: 'userId',
      key: 'userId',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '站点名',
      dataIndex: 'stationName',
      key: 'stationName',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '站点手机号',
      dataIndex: 'stationMobile',
      key: 'stationMobile',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '站点地址',
      dataIndex: 'stationAddress',
      key: 'stationAddress',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '商户编号',
      dataIndex: 'customerCode',
      key: 'customerCode',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '登录名',
      dataIndex: 'loginName',
      key: 'loginName',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '环迅认证名字',
      dataIndex: 'hxName',
      key: 'hxName',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '环迅手机号',
      dataIndex: 'hxMobile',
      key: 'hxMobile',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '专有用户',
      dataIndex: 'hxSpecialUse',
      key: 'hxSpecialUse',
      render: (text) => {
        const realText = {
          1: '是',
          2: '否',
        }
        return <span>{text ? realText[text] : '/'}</span>
      },
    }, {
      title: '邮箱',
      dataIndex: 'Email',
      key: 'Email',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '2', name: '删除' }]} />
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
        expandedRowRender={(record) => {
          return (
            <div className={styles.expand}>
              <p>证件类型: {record.idType || '/'}</p>
              <p>证件号码: {record.idNumber || '/'}</p>
              <p>环迅座机: {record.hxTel || '/'}</p>
              <p>环迅联系地址: {record.hxAddress || '/'}</p>
            </div>
          )
        }}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
