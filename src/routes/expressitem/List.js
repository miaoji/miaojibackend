import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {

  const columns = [
    {
      title: '主体',
      dataIndex: 'subject',
      key: 'subject'
    },
    {
      title: '到付件',
      children: [{
        title: '上架数',
        dataIndex: 'normal.storesNum',
        key: 'normalstoresNum'
      }, {
        title: '签收数',
        dataIndex: 'normal.signNum',
        key: 'normalsignNum'
      }, {
        title: '退回数',
        dataIndex: 'normal.backNum',
        key: 'normalbackNum'
      }, {
        title: '问题件数',
        dataIndex: 'normal.errNum',
        key: 'normalerrNum'
      }]
    }, {
      title: '到付',
      children: [{
        title: '到付件数',
        dataIndex: 'collect.collectNum',
        key: 'collectcollectNum'
      }, {
        title: '上架数',
        dataIndex: 'collect.storesNum',
        key: 'collectstoresNum'
      }, {
        title: '签收数',
        dataIndex: 'collect.signNum',
        key: 'collectsignNum'
      }, {
        title: '退回数',
        dataIndex: 'collect.backNum',
        key: 'collectbackNum'
      }, {
        title: '问题件数',
        dataIndex: 'collect.errNum',
        key: 'collecterrNum'
      }]
    }, {
      title: '代收',
      children: [{
        title: '上架数',
        dataIndex: 'collection.storesNum',
        key: 'collectionstoresNum'
      }, {
        title: '签收数',
        dataIndex: 'collection.signNum',
        key: 'collectionsignNum'
      }, {
        title: '退回数',
        dataIndex: 'collection.backNum',
        key: 'collectionbackNum'
      }, {
        title: '问题件数',
        dataIndex: 'collection.errNum',
        key: 'collectionerrNum'
      }]
    }
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
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
