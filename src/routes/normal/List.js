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
      dataIndex: 'subject',
      key: 'subject'
    },{
        title: '上架数',
        dataIndex: 'storesNum',
        key: 'normalstoresNum'
      }, {
        title: '签收数',
        dataIndex: 'signNum',
        key: 'normalsignNum'
      }, {
        title: '退回数',
        dataIndex: 'backNum',
        key: 'normalbackNum'
      }, {
        title: '问题件数',
        dataIndex: 'errNum',
        key: 'normalerrNum'
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
