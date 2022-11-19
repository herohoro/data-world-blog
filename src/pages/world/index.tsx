import { useRouter } from 'next/router'
import { NUMBER_OF_POSTS_PER_PAGE } from '../../lib/notion/server-constants'
import DocumentHead from '../../components/document-head'
import {
  PostDate,
  PostExcerpt,
  PostTags,
  PostCategory,
  PostTitle,
  PostsNotFound,
  NextPageLink,
  ReadMoreLink,
  PostPerson,
} from '../../components/blog-parts'

import styles from '../../styles/world.module.css'
import partsStyles from '../../styles/blog-parts.module.css'
// import { getCategoryLink } from '../lib/blog-helpers'
import { useEffect } from 'react'
import { Link as Scroll } from 'react-scroll'
import { TEROBI_PAGE_ID } from '../../lib/notion/server-constants'
import NotionBlocks from '../../components/notion-block'
import {
  getAllBlocksByBlockId,
  getPostsByCategory,
  getFirstPostByCategory,
} from '../../lib/notion/client'

export async function getStaticProps() {
  const posts = await getPostsByCategory('WORLD', NUMBER_OF_POSTS_PER_PAGE)
  const blocks = await getAllBlocksByBlockId(TEROBI_PAGE_ID)
  const firstPost = await getFirstPostByCategory('WORLD')

  return {
    props: {
      blocks,
      posts,
      firstPost,
    },
    revalidate: 60,
  }
}

const RenderWorld = ({ blocks, firstPost, posts = [], redirect }) => {
  const router = useRouter()

  useEffect(() => {
    if (redirect && posts.length === 0) {
      router.replace(redirect)
    }
  }, [router, redirect, posts])

  if (!posts) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.container}>
      <DocumentHead
        description="WORLD_study-friends"
        urlOgImage={'japanglish-default.jpg'}
      />

      <div className={styles.mainContent}>
        <NotionBlocks blocks={blocks} />

        {posts.map((post) => {
          return (
            <div className={styles.post} key={post.Slug}>
              <PostCategory post={post} />
              <PostDate post={post} />
              <PostTags post={post} />
              <PostTitle post={post} />
              <PostPerson post={post} />
              <PostExcerpt post={post} />
              <ReadMoreLink post={post} />
            </div>
          )
        })}

        <footer>
          <NextPageLink
            firstPost={firstPost}
            posts={posts}
            category={'WORLD'}
          />
        </footer>
      </div>

      <div className={styles.subContent}>
        <div
          className={partsStyles.blogTagLink}
          style={{ margin: '0 0 3rem 0' }}
        >
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              textAlign: 'center',
            }}
          >
            ＼Terobi is 3 friends／
          </h3>
          <div style={{ padding: '0 0 0 20px ' }}>
            <p>
              &#x1f376;
              <span style={{ padding: '0 0 0 10px' }}>
                <span
                  style={{
                    color: 'yellow',
                    fontSize: '1.5rem',
                    fontWeight: 'bolder',
                    paddingRight: '0.3rem',
                  }}
                >
                  Te
                </span>
                ra san
              </span>
            </p>
            <p>
              &#x1f40c;
              <span style={{ padding: '0 0 0 10px' }}>
                he
                <span
                  style={{
                    color: 'yellow',
                    fontSize: '1.5rem',
                    fontWeight: 'bolder',
                    padding: '0 0.3rem',
                  }}
                >
                  ro
                </span>
                horo
              </span>
            </p>
            <p>
              &#x1f3b8;
              <span style={{ padding: '0 0 0 10px' }}>
                ****
                <span
                  style={{
                    color: 'yellow',
                    fontSize: '1.5rem',
                    fontWeight: 'bolder',
                    paddingLeft: '0.3rem',
                  }}
                >
                  bi
                </span>
              </span>
            </p>
          </div>
        </div>
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
      <Scroll to="topJump" className={styles.topJump} smooth={true}>
        Top
      </Scroll>
    </div>
  )
}
export default RenderWorld
