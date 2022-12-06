import { NUMBER_OF_POSTS_PER_PAGE } from '../../app/server-constants'
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
  TwitterTimeline,
  PostPerson,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
  getAllCategorys,
} from '../../lib/notion/client'
import TopJump from '../../components/top-jamp'

export const revalidate = 60

const BlogPage = async () => {
  const [posts, firstPost, rankedPosts, tags, categorys] = await Promise.all([
    getPosts(NUMBER_OF_POSTS_PER_PAGE),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
    getAllCategorys(),
  ])

  return (
    <div className={styles.container}>
      <div className={styles.flexWraper}>
        <div className={styles.mainContent}>
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
            <NextPageLink firstPost={firstPost} posts={posts} />
          </footer>
        </div>

        <div className={styles.subContent}>
          <TwitterTimeline />
          <BlogCategoryLink heading="Categorys" categorys={categorys} />
          <BlogTagLink heading="Tags" tags={tags} />
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
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

export default BlogPage
