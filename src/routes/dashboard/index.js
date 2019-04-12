import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { NumberCard, User } from './components'
import SimpleChartComponent from './components/Echart/SimpleChartComponent'
import InterfaceCall from './components/Echart/InterfaceCall'
import PieChart from './components/Echart/PieChart'
import { getUserId } from '../../utils'
import styles from './index.less'

function Dashboard({ dashboard, loading, app }) {
  const { interfaceCallData, receviceData, sendData, income, storeTotal, terminalTotal, user, trafficVolume } = dashboard
  const { showDashboard } = app
  if (!showDashboard) {
    return (
      <Card className={styles.noPage}>
        <User {...{ ...user, avatar: '/logo.png' }} />
      </Card>
    )
  }

  const munArr = [income, storeTotal, terminalTotal]
  const munLadings = [
    loading.effects['dashboard/getIncome'],
    loading.effects['dashboard/getStoreTotal'],
    loading.effects['dashboard/getTerminalTotal'],
  ]
  const numberCards = munArr.map((item, key) => {
    return (<Col key={key} lg={8} md={8}>
      <NumberCard {...item} data={munArr} loading={munLadings[key]} />
    </Col>)
  })

  const orderLineProps = {
    receviceData,
    sendData,
    loading: loading.effects['dashboard/query'],
  }
  const interfaceCallLineProps = {
    interfaceCallData,
    // sendData,
    // interfaceCallData,
    loading: loading.effects['dashboard/getInterfaceCall'],
  }

  const pieChartProps = {
    data: trafficVolume,
    loading: loading.effects['dashboard/getbusinessvolumecount'],
  }
  const userId = getUserId()
  return (
    <Row gutter={24}>
      {numberCards}
      <Col lg={24} md={24}>
        <Card>
          <SimpleChartComponent {...orderLineProps} />
        </Card>
      </Col>{(userId === 1 || userId === 101) ? (<Col lg={24} md={24} style={{ marginTop: '24px' }}>
        <Card>
          <InterfaceCall {...interfaceCallLineProps} />
        </Card>
      </Col>) : ''}
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
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading, app }) => ({ dashboard, loading, app }))(Dashboard)
