import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import classnames from 'classnames'
import styles from './Tab.less'

const TabPane = Tabs.TabPane

const Tab = ({
  list,
}) => {
  function callback(key) {
    console.log('list', list)
    console.log('key', key)
  }

  return (
    <Tabs defaultActiveKey="1" onChange={callback} className={classnames({ [styles.tab]: true })}>
      <TabPane tab="点货数" key="1">
        {list.scheduledReceipt}
      </TabPane>
      <TabPane tab="入库数" key="2">
        {list.someCargo}
      </TabPane>
      <TabPane tab="签收数" key="3">
        {list.signingVolume}
      </TabPane>
      <TabPane tab="退回数" key="4">
        {list.returnAmount}
      </TabPane>
    </Tabs>
  )
}

Tab.propTypes = {
  list: PropTypes.array,
}

export default Tab
