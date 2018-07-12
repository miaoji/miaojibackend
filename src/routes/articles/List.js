import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleClick = (text) => {
    const win = window.open('', '预览窗口', 'width=320,height=586')
    win.document.open()
    win.document.write(text)
    win.document.close()
  }
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '文章内容',
      width: 200,
      dataIndex: 'contant',
      key: 'contant',
      render: (text) => {
        return <span className={classnames({ [styles.link]: true })} onClick={() => { handleClick(text) }}>预览</span>
      },
    }, {
      title: '消息类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        const repl = {
          0: '通知提醒',
        }
        return <span>{repl[text] || '未知类型'}</span>
      },
    }, {
      title: '接收人',
      dataIndex: 'receiveId',
      key: 'receiveId',
      render: (text) => {
        if (text === 0) {
          text = '所有人'
        }
        return <span>{text}</span>
      },
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return <span>{text}</span>
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

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
