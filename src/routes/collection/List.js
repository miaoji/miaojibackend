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
  const columns = [{
    title: '主体',
    dataIndex: 'name',
    key: 'subject',
  }, {
    title: '上架数',
    dataIndex: 'numberOfShelves',
    key: 'collectionstoresNum',
  }, {
    title: '签收数',
    dataIndex: 'numberOfReceipts',
    key: 'collectionsignNum',
  }, {
    title: '退回数',
    dataIndex: 'numberOfItemsReturned',
    key: 'collectionbackNum',
  }, {
    title: '问题件数',
    dataIndex: 'numberOfQuestions',
    key: 'collectionerrNum',
  }]

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
}

export default List
