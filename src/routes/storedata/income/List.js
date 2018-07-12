import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const List = ({ isMotion, location, ...tableProps }) => {
  const columns = [
    {
      title: '主体',
      dataIndex: 'name',
      key: 'subject',
    }, {
      title: '派送费',
      dataIndex: 'deliveryAmount',
      key: 'deliveryCharges',
      render: (text) => {
        return <span>{`￥${text}`}</span>
      },
    }, {
      title: '寄件费',
      dataIndex: 'sendTheAmount',
      key: 'SendCharges',
      render: (text) => {
        return <span>{`￥${text}`}</span>
      },
    }, {
      title: '到付费',
      dataIndex: 'toPay',
      key: 'collectCharges',
      render: (text) => {
        return <span>{`￥${text}`}</span>
      },
    }, {
      title: '代收货款费',
      dataIndex: 'collection',
      key: 'collection',
      render: (text) => {
        return <span>{`￥${text}`}</span>
      },
    }, {
      title: '其他费用',
      dataIndex: 'otheramount',
      key: 'incomeothers',
      render: (text) => {
        return <span>{`￥${text}`}</span>
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
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  isMotion: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
}

export default List
