import { NEXT_PUBLIC_SITE_TITLE } from './server-constants'
import GoogleAnalytics from '../components/google-analytics'
import styles from '../styles/page.module.css'
import { INDEX_PAGE_ID } from '../app/server-constants'
import NotionBlocks from '../components/notion-block'
import { getAllBlocksByBlockId } from '../lib/notion/client'
import { Link as Scroll } from 'react-scroll'

export const revalidate = 60

const RootPage = async () => {
  const [blocks] = await Promise.all([getAllBlocksByBlockId(INDEX_PAGE_ID)])

  return (
    <>
      <GoogleAnalytics pageTitle={NEXT_PUBLIC_SITE_TITLE} />
      <div className={styles.container}>
        <NotionBlocks blocks={blocks} />
        <Scroll to="topJump" className={styles.topJump} smooth={true}>
          Top
        </Scroll>
      </div>
    </>
  )
}

export default RootPage
