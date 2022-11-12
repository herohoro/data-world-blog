import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NUMBER_OF_POSTS_PER_PAGE } from '../../../../../lib/notion/server-constants'
import DocumentHead from '../../../../../components/document-head'
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
  NextBackPageLink,
  BackPageLink,
  ReadMoreLink,
  PostPerson,
} from '../../../../../components/blog-parts'

import {
  getPosts,
  getRankedPosts,
  getPostsByCategoryBefore,
  getFirstPostByCategory,
  getAllTags,
  getAllCategorys,
} from '../../../../../lib/notion/client'

import styles from '../../../../../styles/blog.module.css'

export async function getStaticProps({ params: { category, date } }) {
  if (!Date.parse(date) || !/\d{4}-\d{2}-\d{2}/.test(date)) {
    return { notFound: true }
  }

  const posts = await getPostsByCategoryBefore(
    category,
    date,
    NUMBER_OF_POSTS_PER_PAGE
  )

  if (posts.length === 0) {
    console.log(`Failed to find posts for tag: ${category}`)
    return {
      props: {
        redirect: '/blog',
      },
      revalidate: 30,
    }
  }

  const [firstPost, rankedPosts, recentPosts, tags, categorys] =
    await Promise.all([
      getFirstPostByCategory(category),
      getRankedPosts(),
      getPosts(5),
      getAllTags(),
      getAllCategorys(),
    ])

  return {
    props: {
      date,
      posts,
      firstPost,
      rankedPosts,
      recentPosts,
      tags,
      categorys,
      category,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const RenderPostsByCategoryBeforeDate = ({
  date,
  posts = [],
  firstPost,
  rankedPosts = [],
  recentPosts = [],
  tags = [],
  categorys = [],
  category,
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
      <DocumentHead description={`Posts in ${category} before ${date}`} />
      <div className={styles.flexWraper}>
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
            <NextBackPageLink
              firstPost={firstPost}
              posts={posts}
              category={category}
            />
            <BackPageLink firstPost={firstPost} posts={posts} />
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
    </div>
  )
}

export default RenderPostsByCategoryBeforeDate
