import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import NumberCard from './components/numberCard'
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
    title: '京东分成比例(%)',
    number: list[1] ? `${Math.round(Number(list[1]) * 100)}` : '暂无',
    // countUp
  }
  return (
    <div>
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
