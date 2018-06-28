import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'

const Detail = ({ wxuserdetail }) => {
  const { user } = wxuserdetail
  const content = []

  for (let key in user) {
    if ({}.hasOwnProperty.call(user, key)) {
      content.push(
        <div key={key} className={styles.item}>
          <div>{key}</div>
          <div>{String(user[key])}</div>
        </div>
      )
    }
  }
  return (<div className="content-inner">
    <div className={styles.content}>
      {content}
    </div>
  </div>)
}

Detail.propTypes = {
  wxuserdetail: PropTypes.object,
}

export default connect(({ wxuserdetail, loading }) => ({ wxuserdetail, loading: loading.models.wxuserdetail }))(Detail)
