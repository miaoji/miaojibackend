import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'

const detailCN = {
  price: '寄出数量',
  receiveId: '收件数量',
  senduId: '消费金额',
}

const Detail = ({ wxUserDetail }) => {
  const { data, user } = wxUserDetail
  const content = []
  for (let key in data) {
    if ({}.hasOwnProperty.call(data, key)) {
      content.push(<div key={key} className={styles.item}>
        <div>{detailCN[key]} : </div>
        <div>{String(data[key])}</div>
      </div>)
    }
  }
  return (<div className="content-inner">
    <div className={styles.content}>
      <div className={styles.item}>
        <div>用户名 : </div>
        <div>{user.username}</div>
      </div>
      <div className={styles.item}>
        <div>手 机 : </div>
        <div>{user.usermobile}</div>
      </div>
      {content}
    </div>
  </div>)
}

Detail.propTypes = {
  userDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ wxUserDetail, loading }) => ({ wxUserDetail, loading: loading.models.wxuserDetail }))(Detail)
