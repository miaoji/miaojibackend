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
          {list.someCargo.length > 0 ? list.someCargo : <span>暂无数据</span>}
        </div>
      </TabPane>
      <TabPane tab="入库数" key="2">
        <div>
          {list.scheduledReceipt.length > 0 ? list.scheduledReceipt : <span>暂无数据</span>}
        </div>
      </TabPane>
      <TabPane tab="签收数" key="3">
        <div>
          {list.signingVolume.length > 0 ? list.signingVolume : <span>暂无数据</span>}
        </div>
      </TabPane>
      <TabPane tab="补签数" key="4">
        <div>
          {list.retroactive.length > 0 ? list.retroactive : <span>暂无数据</span>}
        </div>
      </TabPane>
      <TabPane tab="退回数" key="5">
        <div>
          {list.returnAmount.length > 0 ? list.returnAmount : <span>暂无数据</span>}
        </div>
      </TabPane>
    </Tabs>
  )
}

Tab.propTypes = {
  list: PropTypes.array,
}

export default Tab
