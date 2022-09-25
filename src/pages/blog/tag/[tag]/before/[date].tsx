import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { NUMBER_OF_POSTS_PER_PAGE } from '../../../../../lib/notion/server-constants'
import DocumentHead from '../../../../../components/document-head'
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
  PostsNotFound,
  ReadMoreLink,
  PostPerson,
} from '../../../../../components/blog-parts'
import styles from '../../../../../styles/blog.module.css'

import {
  getPosts,
  getRankedPosts,
  getPostsByTagBefore,
  getFirstPostByTag,
  getAllTags,
  getAllCategorys,
} from '../../../../../lib/notion/client'

export async function getStaticProps({ params: { tag, date } }) {
  if (!Date.parse(date) || !/\d{4}-\d{2}-\d{2}/.test(date)) {
    return { notFound: true }
  }

  const posts = await getPostsByTagBefore(tag, date, NUMBER_OF_POSTS_PER_PAGE)

  if (posts.length === 0) {
    console.log(`Failed to find posts for tag: ${tag}`)
    return {
      props: {
        redirect: '/blog',
      },
      revalidate: 30,
    }
  }

  const [firstPost, rankedPosts, recentPosts, tags, categorys] =
    await Promise.all([
      getFirstPostByTag(tag),
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
      tag,
      categorys,
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

const RenderPostsByTagBeforeDate = ({
  date,
  posts = [],
  firstPost,
  rankedPosts = [],
  recentPosts = [],
  tags = [],
  tag,
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
      <DocumentHead description={`Posts in ${tag} before ${date}`} />

      <div className={styles.mainContent}>
        <header>
          <span style={{ marginRight: '1rem' }}>tag:</span>
          <h2 style={{ marginLeft: '3rem' }}>{tag}</h2>
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
  )
}

export default RenderPostsByTagBeforeDate
