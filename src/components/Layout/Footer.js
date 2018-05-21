import React from 'react'
import { config } from 'utils'
import styles from './Footer.less'

const Footer = () => {
  return (<div className={styles.footer}>
    {config.footerText}
  </div>)
}

export default Footer
