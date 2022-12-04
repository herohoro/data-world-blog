import { redirect } from 'next/navigation'
import { NEXT_PUBLIC_URL } from '../../server-constants'
import { Post } from '../../../lib/notion/interfaces'
import {
  BlogPostLink,
  BlogTagLink,
  BlogCategoryLink,
  NoContents,
  PostBody,
  PostDate,
  PostTags,
  PostCategory,
  PostTitle,
  ShareUrl,
  PostPerson,
  TwitterTimeline,
} from '../../../components/blog-parts'
import SocialButtons from '../../../components/social-buttons'
import styles from '../../../styles/blog.module.css'
import { getBlogLink } from '../../../lib/blog-helpers'
import {
  getPosts,
  getAllPosts,
  getRankedPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags,
  getAllCategorys,
  getAllBlocksByBlockId,
} from '../../../lib/notion/client'
import { Link as Scroll } from 'react-scroll'
import Toc from '../../../components/toc'

export const revalidate = 30
export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.Slug }))
}

const BlogSlugPage = async ({ params: { slug } }) => {
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    redirect('/blog')
  }

  const [blocks, rankedPosts, recentPosts, tags, categorys, sameTagPosts] =
    await Promise.all([
      getAllBlocksByBlockId(post.PageId),
      getRankedPosts(),
      getPosts(5),
      getAllTags(),
      getAllCategorys(),
      getPostsByTag(post.Tags[0], 6),
    ])

  const otherPostsHavingSameTag = sameTagPosts.filter(
    (p: Post) => p.Slug !== post.Slug
  )

  return (
    <div className={styles.container}>
      <div className={styles.flexWraper}>
        <div className={styles.mainContent}>
          <div className={styles.post}>
            <PostCategory post={post} />
            <PostDate post={post} />
            <PostTags post={post} />
            <PostTitle post={post} enableLink={false} />
            <PostPerson post={post} />

            <NoContents contents={blocks} />
            <PostBody blocks={blocks} />

            <ShareUrl post={post} />

            <footer>
              {NEXT_PUBLIC_URL && (
                <SocialButtons
                  title={post.Title}
                  url={new URL(
                    getBlogLink(post.Slug),
                    NEXT_PUBLIC_URL
                  ).toString()}
                  id={post.Slug}
                />
              )}
            </footer>
          </div>
        </div>

        <div className={styles.subContent}>
          <BlogPostLink
            heading="Posts in the same category"
            posts={otherPostsHavingSameTag}
          />
          <BlogCategoryLink heading="Categorys" categorys={categorys} />
          <BlogTagLink heading="Tags" tags={tags} />
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogPostLink heading="Latest posts" posts={recentPosts} />
          <Toc />
        </div>
      </div>

      <div className={styles.endContent}>
        <div className={styles.endSection}>
          <BlogPostLink heading="Posts in the same tag" posts={sameTagPosts} />
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
        </div>
        <div className={styles.endSection}>
          <BlogPostLink heading="Latest posts" posts={recentPosts} />

          <div className={styles.inlineCenter}>
            <BlogCategoryLink heading="Category List" categorys={categorys} />
          </div>
        </div>
        <div className={styles.endSection}>
          <BlogTagLink heading="Tag List" tags={tags} />
          <TwitterTimeline />
        </div>
      </div>
      <Scroll to="topJump" className={styles.topJump} smooth={true}>
        Top
      </Scroll>
    </div>
  )
}

export default BlogSlugPage
