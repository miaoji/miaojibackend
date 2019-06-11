import React from 'react'
import PropTypes from 'prop-types'
import { Table, Spin } from 'antd'
import { Link } from 'dva/router'
import classnames from 'classnames'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import Tab from './Tab'

const List = ({ onDeleteItem, tabLoading, onEditItem, sonlist, isMotion, location, ...tableProps }) => {
  const filter = location.query
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return <Link to={`/backupbusinessvolumedetail?idUser=${text}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>{text}</Link>
        }
        return <Link to={`/backupbusinessvolumedetail?idUser=${text}`}>{text}</Link>
        // return <a rel="noopener noreferrer" target="_blank" href={`/backupbusinessvolumedetail?idUser=${text}&createTime=${createTime[0]}&createTime=${createTime[1]}`}>{text}</a>
      },
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
      width: 160,
      dataIndex: 'district',
      key: 'district',
      render: (text, record) => {
        return <span>{`${record.province}/${record.city}/${record.district}`}</span>
      },
    }, {
      title: '点货数',
      dataIndex: 'someCargo',
      key: 'someCargo',
      width: 100,
    }, {
      title: '入库数',
      dataIndex: 'scheduledReceipt',
      key: 'scheduledReceipt',
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
      title: '补签数',
      dataIndex: 'retroactive',
      key: 'retroactive',
      width: 100,
      render: (text) => {
        return (<span>{text || 0}</span>)
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
        expandedRowRender={(record) => {
          if (tabLoading) {
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
          return <Tab record={record} list={sonlist} />
        }}
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
  tabLoading: PropTypes.bool,
}

export default List
