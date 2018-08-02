import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import classnames from 'classnames'
import styles from './Tab.less'

const TabPane = Tabs.TabPane

const Tab = ({
  list,
}) => {
  return (
    <Tabs defaultActiveKey="1" className={classnames({ [styles.tab]: true })}>
      <TabPane tab="点货数" key="1">
        <div>
          {list.someCargo}
        </div>
      </TabPane>
      <TabPane tab="入库数" key="2">
        <div>
          {list.scheduledReceipt}
        </div>
      </TabPane>
      <TabPane tab="签收数" key="3">
        <div>
          {list.signingVolume}
        </div>
      </TabPane>
      <TabPane tab="退回数" key="4">
        <div>
          {list.returnAmount}
        </div>
      </TabPane>
    </Tabs>
  )
}

Tab.propTypes = {
  list: PropTypes.array,
}

export default Tab
