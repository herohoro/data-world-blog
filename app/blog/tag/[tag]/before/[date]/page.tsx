import { notFound } from 'next/navigation'
import { NUMBER_OF_POSTS_PER_PAGE } from '../../../../../../app/server-constants'
import {
  BlogPostLink,
  BlogTagLink,
  BlogCategoryLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostCategory,
  PostTitle,
  ReadMoreLink,
  PostPerson,
  TwitterTimeline,
} from '../../../../../../components/blog-parts'
import {
  getPosts,
  getRankedPosts,
  getPostsByTagBefore,
  getFirstPostByTag,
  getAllTags,
  getAllCategorys,
} from '../../../../../../lib/notion/client'
import styles from '../../../../../../styles/blog.module.css'
import TopJump from '../../../../../../components/top-jamp'

export const revalidate = 3600

const BlogTagBeforeDatePage = async ({
  params: { tag: encodedTag, date: encodedDate },
}) => {
  const tag = decodeURIComponent(encodedTag)
  const date = decodeURIComponent(encodedDate)

  if (!Date.parse(date) || !/^\d{4}-\d{2}-\d{2}/.test(date)) {
    notFound()
  }

  const [posts, firstPost, rankedPosts, recentPosts, tags, categorys] =
    await Promise.all([
      getPostsByTagBefore(tag, date, NUMBER_OF_POSTS_PER_PAGE),
      getFirstPostByTag(tag),
      getRankedPosts(),
      getPosts(5),
      getAllTags(),
      getAllCategorys(),
    ])

  return (
    <div className={styles.container}>
      <div className={styles.flexWraper}>
        <div className={styles.mainContent}>
          <header>
            <span style={{ marginRight: '1rem' }}>tag:</span>
            <h2 style={{ marginLeft: '3rem' }}>
              {tag} before {date.split('T')[0]}
            </h2>
          </header>

          <NoContents contents={posts} />

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
            <NextPageLink firstPost={firstPost} posts={posts} tag={tag} />
          </footer>
        </div>

        <div className={styles.subContent}>
          <BlogCategoryLink heading="Categorys" categorys={categorys} />
          <BlogTagLink heading="Tags" tags={tags} />
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogPostLink heading="Latest Posts" posts={recentPosts} />
        </div>
      </div>
      <div className={styles.endContent}>
        <div className={styles.endSection}>
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
        </div>
        <div className={styles.endSection}>
          <BlogCategoryLink heading="Category List" categorys={categorys} />
          <TwitterTimeline />
        </div>
        <div className={styles.endSection}>
          <BlogTagLink heading="Tag List" tags={tags} />
        </div>
      </div>
      <TopJump />
    </div>
  )
}

export default BlogTagBeforeDatePage
