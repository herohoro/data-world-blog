import DocumentHead from '../components/document-head'
import styles from '../styles/blog.module.css'
import { TEROBI_PAGE_ID } from '../lib/notion/server-constants'
import NotionBlocks from '../components/notion-block'
import { getAllBlocksByBlockId } from '../lib/notion/client'

export async function getStaticProps() {
  const blocks = await getAllBlocksByBlockId(TEROBI_PAGE_ID)
  return {
    props: {
      blocks,
    },
    revalidate: 60,
  }
}

const RenderWorld = ({ blocks }) => (
  <div className={styles.container}>
    <DocumentHead />

    <div className={styles.worldMainContent}>
      <NotionBlocks blocks={blocks} />
    </div>
    <div className={styles.subContent}>
      <a
        className="twitter-timeline"
        data-lang="en"
        data-chrome="nofooter,transparent,noheader,noborders"
        data-width="100%"
        data-height="500"
        data-theme="dark"
        href="https://twitter.com/terobi_japan?ref_src=twsrc%5Etfw"
      >
        Tweets by terobi_japan
      </a>{' '}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        // charset="utf-8"
      ></script>
      <a
        className="twitter-timeline"
        data-lang="en"
        data-chrome="nofooter,transparent,noheader,noborders"
        data-width="100%"
        data-height="500"
        data-theme="dark"
        href="https://twitter.com/tera_web3?ref_src=twsrc%5Etfw"
      >
        Tweets by tera_web3
      </a>{' '}
      <script async src="https://platform.twitter.com/widgets.js"></script>
      <a
        className="twitter-timeline"
        data-lang="en"
        data-chrome="nofooter,transparent,noheader,noborders"
        data-width="100%"
        data-height="300"
        data-theme="dark"
        href="https://twitter.com/mineral_30?ref_src=twsrc%5Etfw"
      >
        Tweets by mineral_30 &#92; Follow me &#47;
      </a>{' '}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        // charset="utf-8"
      ></script>
    </div>
  </div>
)

export default RenderWorld
