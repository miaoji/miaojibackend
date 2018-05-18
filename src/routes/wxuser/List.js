import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { time } from '../../utils'

const List = ({ onMarkItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleUserClick = (record) => {
    const str = record.mobile.toString()
    let encryptNum = `${str.substr(0, 5)}****${str.substr(9, 10)}`
    window.open(`/wxuserdetail?userId=${record.userId}&username=${record.name}&usermobile=${encryptNum}`)
  }

  const columns = [
    {
      title: '微信名',
      dataIndex: 'name',
      key: 'name',
      width: 64,
      render: (text, record) => {
        return <Button type="primary" size="default" ghost onClick={e => handleUserClick(record, e)}>{text}</Button>
      },
    }, {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text) => {
        const str = text.toString()
        let encryptNum = `${str.substr(0, 5)}****${str.substr(9, 10)}`
        return <span>{encryptNum}</span>
      },
    }, {
      title: '创建时间',
      dataIndex: 'subscribeTime',
      key: 'subscribeTime',
      render: (text) => {
        const createtime = time.formatTime(text)
        return <span>{createtime}</span>
      },
    }, {
      title: '消费金额',
      dataIndex: 'price',
      key: 'price',
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '关注状态',
      dataIndex: 'subscribe',
      key: 'subscribe',
      filters: [
        { text: '关注', value: '1' },
        { text: '取消关注', value: '0' },
      ],
      filterMultiple: false,
      // onFilter: (value, record) => Number(record.subscribe) === Number(value),
      render: (text) => {
        const realtext = {
          0: '取消关注',
          1: '关注',
        }
        return <span>{realtext[text]}</span>
      },
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
        scroll={{ x: 760 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onMarkItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
