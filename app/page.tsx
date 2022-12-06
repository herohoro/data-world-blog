import { NEXT_PUBLIC_SITE_TITLE } from './server-constants'
import GoogleAnalytics from '../components/google-analytics'
import styles from '../styles/page.module.css'
import { INDEX_PAGE_ID } from '../app/server-constants'
import NotionBlocks from '../components/notion-block'
import { getAllBlocksByBlockId } from '../lib/notion/client'
import TopJump from '../components/top-jamp'

export const revalidate = 60

const RootPage = async () => {
  const [blocks] = await Promise.all([getAllBlocksByBlockId(INDEX_PAGE_ID)])

  return (
    <>
      <GoogleAnalytics pageTitle={NEXT_PUBLIC_SITE_TITLE} />
      <div className={styles.container}>
        <NotionBlocks blocks={blocks} />
        <TopJump />
      </div>
    </>
  )
}

export default RootPage
