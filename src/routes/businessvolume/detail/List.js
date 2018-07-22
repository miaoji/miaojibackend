import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const columns = [
    {
      title: '快递品牌',
      dataIndex: 'brand',
      key: 'brand',
      width: 100,
    }, {
      title: '快递单号',
      width: 160,
      dataIndex: 'orderSn',
      key: 'orderSn',
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
}

export default List
