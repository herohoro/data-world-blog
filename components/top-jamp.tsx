'use client'

import { Link as Scroll } from 'react-scroll'
import styles from '../styles/page.module.css'

const TopJump = () => {
  return (
    <Scroll to="topJump" className={styles.topJump} smooth={true}>
      Top
    </Scroll>
  )
}

export default TopJump
