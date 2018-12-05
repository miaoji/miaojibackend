import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { NumberCard, User } from './components'
import SimpleChartComponent from './components/Echart/SimpleChartComponent'
import PieChart from './components/Echart/PieChart'

function Dashboard({ dashboard, loading }) {
  const { receviceData, sendData, income, storeTotal, weChatUser, terminalTotal, user, trafficVolume } = dashboard


  const munArr = [income, storeTotal, weChatUser, terminalTotal]
  const munLadings = [
    loading.effects['dashboard/getIncome'],
    loading.effects['dashboard/getStoreTotal'],
    loading.effects['dashboard/getWeChatUser'],
    loading.effects['dashboard/getTerminalTotal'],
  ]
  const numberCards = munArr.map((item, key) => {
    return (<Col key={key} lg={6} md={12}>
      <NumberCard {...item} data={munArr} loading={munLadings[key]} />
    </Col>)
  })

  const lineProps = {
    receviceData,
    sendData,
    loading: loading.effects['dashboard/query'],
  }

  const pieChartProps = {
    data: trafficVolume,
    loading: loading.effects['dashboard/getbusinessvolumecount'],
  }

  return (
    <Row gutter={24}>
      {numberCards}
      <Col lg={24} md={24}>
        <Card>
          <SimpleChartComponent {...lineProps} />
        </Card>
      </Col>
      <Col lg={12} md={12} style={{ marginTop: '24px' }}>
        <Card>
          <PieChart {...pieChartProps} />
        </Card>
      </Col>
      <Col lg={12} md={12} style={{ marginTop: '24px' }}>
        <User {...user} />
      </Col>
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
