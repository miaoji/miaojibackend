import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const List = ({ onDeleteItem, queryColumnslist, columnslist, onEditItem, isMotion, location, ...tableProps }) => {
  const columns = [
    {
      title: '主体',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '空'}</span>
      },
    }, {
      title: '通讯费',
      dataIndex: 'communicate',
      key: 'communicate',
      render: (text) => {
        return <span>{`￥${text}`}</span>
      },
    }, {
      title: '提现费用',
      dataIndex: 'withdrawalAmount',
      key: 'withdrawalAmount',
      render: (text) => {
        return <span>{`￥${text}`}</span>
      },
    }, {
      title: '其他',
      dataIndex: 'otheramount',
      key: 'otheramount',
      render: (text) => {
        return <span>{`￥${text}`}</span>
      },
    },
    //   {
    //   title: '余额',
    //   dataIndex: 'balance',
    //   key: 'balance',
    //   render: (text) => <span></span>,
    // }
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
}

export default List
