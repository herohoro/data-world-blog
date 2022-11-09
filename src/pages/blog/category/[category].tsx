import { useRouter } from 'next/router'

import { NUMBER_OF_POSTS_PER_PAGE } from '../../../lib/notion/server-constants'
import DocumentHead from '../../../components/document-head'
import {
  BlogPostLink,
  BlogTagLink,
  BlogCategoryLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostCategory,
  PostTitle,
  PostsNotFound,
  TwitterTimeline,
  NextPageLink,
  ReadMoreLink,
  PostPerson,
} from '../../../components/blog-parts'
import styles from '../../../styles/blog.module.css'
import { getCategoryLink } from '../../../lib/blog-helpers'
import { useEffect } from 'react'
import {
  getPosts,
  getRankedPosts,
  getPostsByCategory,
  getFirstPostByCategory,
  getAllTags,
  getAllCategorys,
} from '../../../lib/notion/client'

export async function getStaticProps({ params: { category } }) {
  const posts = await getPostsByCategory(category, NUMBER_OF_POSTS_PER_PAGE)

  const [firstPost, rankedPosts, recentPosts, tags, categorys] =
    await Promise.all([
      getFirstPostByCategory(category),
      getRankedPosts(),
      getPosts(5),
      getAllTags(),
      getAllCategorys(),
    ])

  if (posts.length === 0) {
    console.log(`Failed to find posts for category: ${category}`)
    return {
      props: {
        redirect: '/blog',
      },
      revalidate: 30,
    }
  }

  return {
    props: {
      posts,
      firstPost,
      rankedPosts,
      recentPosts,
      tags,
      categorys,
      category,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const category = await getAllCategorys()

  console.log(category)

  return {
    paths: category.map((category) => getCategoryLink(category)),
    fallback: 'blocking',
  }
}

const RenderPostsByCategorys = ({
  category,
  posts = [],
  firstPost,
  rankedPosts = [],
  recentPosts = [],
  tags = [],
  categorys = [],
  redirect,
}) => {
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
      <DocumentHead description={`Posts in ${category}`} />

      <div className={styles.mainContent}>
        <header>
          <span style={{ marginRight: '3rem' }}>category:</span>
          <h2 style={{ marginLeft: '3rem' }}>{category}</h2>
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
          <NextPageLink
            firstPost={firstPost}
            posts={posts}
            category={category}
          />
        </footer>
      </div>

      <div className={styles.subContent}>
        <BlogCategoryLink heading="Categorys" categorys={categorys} />
        <BlogTagLink heading="Tags" tags={tags} />
        <BlogPostLink heading="Recommended" posts={rankedPosts} />
        <BlogPostLink heading="Latest Posts" posts={recentPosts} />
        <TwitterTimeline />
      </div>
    </div>
  )
}

export default RenderPostsByCategorys
