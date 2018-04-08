import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less'
import { Card, Col, Row } from 'antd'

const List = ({ list, filter, handleClick }) => {
  console.log('list', list)
  // const { data } = storeUserDetail
  const detail = (
    <Row gutter={16}>
      {list.length > 0 ? list.map((item) => {
        return (
          <Col span={4}>
            <Card className={styles.card} onClick={() => { handleClick({ realName: item.realName, ...filter }) }}>
              <p>操作人: {item.realName}</p>
              <p>寄件总金额: {item.countfee || 0}元</p>
            </Card>
          </Col>
        )
      }) : <span>暂无相关数据</span>}
    </Row>
  )
  return (<div className="content-inner">
    <div className={styles.content}>
      {detail}
    </div>
  </div>)
}

List.propTypes = {
  list: PropTypes.object,
  handleClick: PropTypes.func,
  filter: PropTypes.object,
}

export default List
