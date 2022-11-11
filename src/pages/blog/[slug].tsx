import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Toc from '../../components/toc'
import { NEXT_PUBLIC_URL } from '../../lib/notion/server-constants'
import { Post } from '../../lib/notion/interfaces'
import DocumentHead from '../../components/document-head'
import { Block } from '../../lib/notion/interfaces'
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
  PostsNotFound,
  ShareUrl,
  PostPerson,
} from '../../components/blog-parts'
import SocialButtons from '../../components/social-buttons'
import styles from '../../styles/blog.module.css'
import { getBlogLink } from '../../lib/blog-helpers'
import {
  getPosts,
  getAllPosts,
  getRankedPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags,
  getAllCategorys,
  getAllBlocksByBlockId,
} from '../../lib/notion/client'

export async function getStaticProps({ params: { slug } }) {
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      props: {
        redirect: '/blog',
      },
      revalidate: 30,
    }
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

  const fallback = {}
  fallback[slug] = blocks

  return {
    props: {
      slug,
      post,
      rankedPosts,
      recentPosts,
      tags,
      categorys,
      sameTagPosts: sameTagPosts.filter((p: Post) => p.Slug !== post.Slug),
      fallback,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts()
  return {
    paths: posts.map((post) => getBlogLink(post.Slug)),
    fallback: 'blocking',
  }
}

const fetchBlocks = async (slug: string): Promise<Array<Block>> => {
  try {
    const { data: blocks } = await axios.get(`/api/blocks?slug=${slug}`)
    return blocks as Array<Block>
  } catch (error) {
    console.log(error)
  }
}

const includeExpiredImage = (blocks: Array<Block>): boolean => {
  const now = Date.now()

  return blocks.some((block) => {
    if (block.Type === 'image') {
      const image = block.Image
      if (
        image.File &&
        image.File.ExpiryTime &&
        Date.parse(image.File.ExpiryTime) < now
      ) {
        return true
      }
    }
    // TODO: looking for the image block in Children recursively
    return false
  })
}

const RenderPost = ({
  slug,
  post,
  rankedPosts = [],
  recentPosts = [],
  sameTagPosts = [],
  tags = [],
  categorys = [],
  fallback,
}) => {
  const { data: blocks, error } = useSWR(
    includeExpiredImage(fallback[slug]) && slug,
    fetchBlocks,
    { fallbackData: fallback[slug] }
  )

  if (error || !blocks) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.container}>
      <DocumentHead
        title={post.Title}
        description={post.Excerpt}
        urlOgImage={post.OGImage}
      />

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
          posts={sameTagPosts}
        />
        <BlogCategoryLink heading="Categorys" categorys={categorys} />
        <BlogTagLink heading="Tags" tags={tags} />
        <BlogPostLink heading="Recommended" posts={rankedPosts} />
        <BlogPostLink heading="Latest posts" posts={recentPosts} />
        {/* <IndexList heading="★ MOKUJI ★" blocks={blocks} /> */}
        <Toc />
      </div>
    </div>
  )
}

export default RenderPost
