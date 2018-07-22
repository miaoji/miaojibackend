import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import Tab from './Tab'

const List = ({ onDeleteItem, onEditItem, sonlist, isMotion, location, ...tableProps }) => {
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text) => {
        const { createTime } = location.query
        // return <Link to={`/businessvolumeDetail?idUser=${text}&createTime=${createTime[0]}&createTime=${createTime[1]}`}>{text}</Link>
        return <a rel="noopener noreferrer" target="_blank" href={`/businessvolumeDetail?idUser=${text}&createTime=${createTime[0]}&createTime=${createTime[1]}`}>{text}</a>
      },
    }, {
      title: '区',
      width: 160,
      dataIndex: 'district',
      key: 'district',
    }, {
      title: '站点名称',
      dataIndex: 'name',
      key: 'name',
      width: 170,
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '点货数',
      dataIndex: 'scheduledReceipt',
      key: 'scheduledReceipt',
      width: 100,
    }, {
      title: '入库数',
      dataIndex: 'someCargo',
      key: 'someCargo',
      width: 70,
      render: (text) => {
        return (<span>{text}</span>)
      },
    }, {
      title: '签收数',
      dataIndex: 'signingVolume',
      key: 'signingVolume',
      width: 100,
      render: (text) => {
        return (<span>{text}</span>)
      },
    }, {
      title: '退回数',
      dataIndex: 'returnAmount',
      key: 'returnAmount',
      width: 100,
      render: (text) => {
        return (<span>{text}</span>)
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
        className={classnames({ [styles.table]: true, [styles.motion]: false })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
        expandedRowRender={record => <Tab record={record} list={sonlist} />}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  isMotion: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  sonlist: PropTypes.array,
}

export default List
