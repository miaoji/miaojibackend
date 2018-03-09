import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { DropOption } from '../../components'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const confirm = Modal.confirm

const List = ({ openSentalong, openSelectshelves, location, onEditItem, onDeleteItem, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        // window.open(`/bootdetail?orderNo=${record.ORDER_NO}`)
        openSelectshelves(record.idUser)
        break
      case '2':
        openSentalong(record.idUser)
        break
      default:
        break
    }
  }

  const columns = [
    {
      title: '站点名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '暂无站点名'}</span>
      }
    }, {
      title: '单号',
      dataIndex: 'orderSn',
      key: 'orderSn',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      }
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => {
        const repltext = {
          101: '上架',
          103: '分派',
        }
        return <span>{text ? repltext[text] : '未知'}</span>
      }
    }, {
      title: '日期',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return <span>{text}</span>
      }
    }, {
      title: '更多信息',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '上架信息' }, { key: '2', name: '分配信息' }]} />
      }
    }
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    rows: tableProps.pagination.rows,
  }

  const getBodyWrapper = body => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

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
