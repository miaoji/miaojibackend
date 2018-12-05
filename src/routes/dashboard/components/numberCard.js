import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Card, Spin } from 'antd'
import CountUp from 'react-countup'
import styles from './numberCard.less'

function NumberCard({ icon, color, title, number, countUp, loading }) {
  return (
    <Spin spinning={loading}>
      <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
        <Icon className={styles.iconWarp} style={{ color }} type={icon} />
        <div className={styles.content}>
          <p className={styles.title}>{title || 'No Title'}</p>
          <p className={styles.number}>
            <CountUp
              start={0}
              end={number}
              duration={2.75}
              useEasing
              useGrouping
              separator=","
              {...countUp || {}}
            />
          </p>
        </div>
      </Card>
    </Spin>
  )
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
  loading: PropTypes.bool,
}

export default NumberCard
