import React from 'react'
import PropTypes from 'prop-types'
import NumberCard from './item/numberCard'
import { Row, Col } from 'antd'
import { color } from '../../utils/theme'
const List = ({ list }) => {
  const countProps = {
    icon: 'database',
    color: color.blue,
    title: '单号池剩余数量',
    number: list[0] || '暂无',
    // countUp
  }
  const ratioProps = {
    icon: 'credit-card',
    color: color.green,
    title: '京东分成比例',
    number: list[1] ? `${Math.round(Number(list[1]) * 100)}%` : '暂无',
    // countUp
  }
  return (
    <div>
      {/* <br />
      <h1>单号池剩余单号数量为 <b>{list[0] || '暂无'}</b></h1>
      <br />
      <h1>京东分成比例为 <b>{list[1] ? `${Math.round(Number(list[1]) * 100)}%` : '暂无'}</b></h1> */}
      <Row gutter={24}>
        <Col lg={6} md={12}>
          <NumberCard {...countProps} />
        </Col>
        <Col lg={6} md={12}>
          <NumberCard {...ratioProps} />
        </Col>
      </Row>
    </div>
  )
}

List.propTypes = {
  list: PropTypes.str,
}

export default List
