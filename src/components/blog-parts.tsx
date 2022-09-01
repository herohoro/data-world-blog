import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Post } from '../lib/notion/interfaces'
import NotionBlocks from './notion-block'
import {
  getBeforeLink,
  getBlogLink,
  getDateStr,
  getTagLink,
  getTagBeforeLink,
} from '../lib/blog-helpers'
import styles from '../styles/blog-parts.module.css'

export const PostDate = ({ post }) => (
  <div className={styles.postDate}>
    {post.Date ? getDateStr(post.Date) : ''}
  </div>
)

export const ShareUrl = ({ post }) => {
  const postShareUrl = post.ShareUrl ? post.ShareUrl : ''
  if (postShareUrl.length === 0) return null

  return (
    <>
      <hr />
      <p>
        Would you like to speak the sentences in this article with correct
        pronunciation while comparing them with Japanese?
        <br />
        We have embedded audio data from a site that reads aloud slowly into
        Notion. <br />
        If you go to the following link, you can practice by playing the audio
        data while looking at the text of the article.
        <br />
        &#x1F53D;
      </p>
      <a href={postShareUrl}>{postShareUrl}</a>
      <br />
      <br />
    </>
  )
}

export const PostTitle = ({ post, enableLink = true }) => {
  const postTitle = post.Title ? post.Title : ''

  return (
    <h3 className={styles.postTitle}>
      {enableLink ? (
        <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
          <a>{postTitle}</a>
        </Link>
      ) : (
        postTitle
      )}
    </h3>
  )
}

export const PostTags = ({ post }) => (
  <div className={styles.postTags}>
    {post.Tags &&
      post.Tags.length > 0 &&
      post.Tags.map((tag: string) => (
        <Link href="/blog/tag/[tag]" as={getTagLink(tag)} key={tag} passHref>
          <a>{tag}</a>
        </Link>
      ))}
  </div>
)

export const PostExcerpt = ({ post }) => (
  <div className={styles.postExcerpt}>
    <p>{post.Excerpt ? post.Excerpt : ''}</p>
  </div>
)

export const PostBody = ({ blocks }) => (
  <div className={styles.postBody}>
    <NotionBlocks blocks={blocks} />
  </div>
)

export const ReadMoreLink = ({ post }) => (
  <div className={styles.readMoreLink}>
    <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
      <a className={styles.readMore}>Read more</a>
    </Link>
  </div>
)

export const NextPageLink = ({ firstPost, posts, tag = '' }) => {
  if (!firstPost) return null
  if (posts.length === 0) return null

  const lastPost = posts[posts.length - 1]

  if (firstPost.Date === lastPost.Date) return null

  return (
    <div className={styles.nextPageLink}>
      <Link
        href={tag ? '/blog/tag/[tag]/before/[date]' : '/blog/before/[date]'}
        as={
          tag
            ? getTagBeforeLink(tag, lastPost.Date)
            : getBeforeLink(lastPost.Date)
        }
        passHref
      >
        <a>Find more articles ＞</a>
      </Link>
    </div>
  )
}
export const NextBackPageLink = ({ firstPost, posts, tag = '' }) => {
  const router = useRouter()
  if (!firstPost) return null
  if (posts.length === 0) return null

  const lastPost = posts[posts.length - 1]

  if (firstPost.Date === lastPost.Date) return null

  return (
    <div className={styles.nextContainer}>
      <div className={styles.buttonSubContainer}>
        <a className={styles.backButton} onClick={() => router.back()}>
          {' '}
          ＜ New{' '}
        </a>
        <Link
          href={tag ? '/blog/tag/[tag]/before/[date]' : '/blog/before/[date]'}
          as={
            tag
              ? getTagBeforeLink(tag, lastPost.Date)
              : getBeforeLink(lastPost.Date)
          }
          passHref
        >
          <a className={styles.nextPageLink}>Old ＞</a>
        </Link>
      </div>
    </div>
  )
}

export const BackPageLink = ({ firstPost, posts }) => {
  const router = useRouter()
  if (!firstPost) return null
  if (posts.length === 0) return null

  const lastPost = posts[posts.length - 1]

  if (firstPost.Date !== lastPost.Date) return null

  return (
    <div className={styles.nextContainer}>
      <div className={styles.buttonSubContainer}>
        <a className={styles.backButton} onClick={() => router.back()}>
          {' '}
          ＜ New{' '}
        </a>
      </div>
    </div>
  )
}

export const NoContents = ({ contents }) => {
  if (!!contents && contents.length > 0) return null

  return <div className={styles.noContents}>There are no contents yet</div>
}

export const TwitterTimeline = () => (
  <div className={styles.twitterTimeline}>
    <h3>Twitter</h3>
    <hr />
    <a
      className="twitter-timeline"
      data-lang="en"
      data-chrome="nofooter,transparent,noheader"
      data-width="500"
      data-height="500"
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
)

export const BlogPostLink = ({ heading, posts }) => (
  <div className={styles.blogPostLink}>
    <h3>{heading}</h3>
    <NoContents contents={posts} />
    <PostLinkList posts={posts} />
  </div>
)

export const BlogTagLink = ({ heading, tags }) => (
  <div className={styles.blogTagLink}>
    <h3>{heading}</h3>
    <NoContents contents={tags} />
    <TagLinkList tags={tags} />
  </div>
)

export const PostLinkList = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <ul>
      {posts.map((post: Post) => {
        return (
          <li key={post.Slug}>
            <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
              <a>{post.Title}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export const TagLinkList = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <ul>
      {tags.map((tag: string) => {
        return (
          <li key={tag}>
            <Link href="/blog/tag/[tag]" as={getTagLink(tag)} passHref>
              <a>{tag}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export const PostsNotFound = () => (
  <div className={styles.postsNotFound}>
    Woops! did not find the posts, redirecting you back to the blog index
  </div>
)
