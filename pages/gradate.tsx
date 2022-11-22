import DocumentHead from '../components/document-head'
import styles from '../styles/blog.module.css'
// import { TEROBI_PAGE_ID } from '../lib/notion/server-constants'
// import NotionBlocks from '../components/notion-block'
// import { getAllBlocksByBlockId } from '../lib/notion/client'

const RenderGradate = () => (
  <div className={styles.container}>
    <DocumentHead />
    <div style={{ height: '1000px' }}></div>
    <div className={styles.teroMainContent}></div>
  </div>
)

export default RenderGradate
