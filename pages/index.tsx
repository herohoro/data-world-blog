import DocumentHead from '../components/document-head'
import styles from '../styles/page.module.css'
import { INDEX_PAGE_ID } from '../lib/notion/server-constants'
import NotionBlocks from '../components/notion-block'
import { getAllBlocksByBlockId } from '../lib/notion/client'
import { Link as Scroll } from 'react-scroll'

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
    <Scroll to="topJump" className={styles.topJump} smooth={true}>
      Top
    </Scroll>
  </div>
)

export default RenderPage
