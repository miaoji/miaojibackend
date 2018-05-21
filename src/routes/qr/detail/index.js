import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'

const wxQrPrefix = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='

const Detail = ({ qrDetail }) => {
  const { name, ticket, remark } = qrDetail
  const imgSrc = wxQrPrefix + ticket

  return (<div className="content-inner">
    <div className={styles.content}>
      <div className={styles.item}>
        <div>门店: {name}</div>
        <div>简介: {remark}</div>
        <div><img src={imgSrc} alt="二维码" /></div>
      </div>
    </div>
  </div>)
}

Detail.propTypes = {
  qrDetail: PropTypes.object,
}

export default connect(({ qrDetail, loading }) => ({ qrDetail, loading: loading.models.qrDetail }))(Detail)
