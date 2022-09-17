import DocumentHead from '../components/document-head'
import ExtLink from '../components/ext-link'
import styles from '../styles/page.module.css'
import { INDEX_PAGE_ID } from '../lib/notion/server-constants'
import NotionBlocks from '../components/notion-block'
import { getAllBlocksByBlockId } from '../lib/notion/client'

export async function getStaticProps() {
  const blocks = await getAllBlocksByBlockId(INDEX_PAGE_ID)
  return {
    props: {
      blocks,
    },
    revalidate: 60,
  }
}

const RenderPage = ({ blocks }) => (
  <div className={styles.container}>
    <DocumentHead />
    <NotionBlocks blocks={blocks} />
  </div>
)

export default RenderPage
