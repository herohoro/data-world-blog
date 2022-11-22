import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Post } from '../lib/notion/interfaces'
import NotionBlocks from './notion-block'
import MokujiBlocks from './mokuji-block'
import {
  getBeforeLink,
  getBlogLink,
  getDateStr,
  getTagLink,
  getCategoryLink,
  getTagBeforeLink,
  getCategoryBeforeLink,
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
      <h4>
        Would you like to speak the sentences in this article with correct
        pronunciation while comparing them with Japanese?
      </h4>
      <br />
      <br />
      <p>
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
export const PostPerson = ({ post }) => {
  const postPerson = post.Person ? post.Person : ''
  if (postPerson.length === 0) return null

  return (
    <>
      &#x1f464;<span style={{ padding: '0 0 0 10px' }}>{postPerson}</span>
    </>
  )
}

export const PostTitle = ({ post, enableLink = true }) => {
  const postTitle = post.Title ? post.Title : ''

  return (
    <h3 className={styles.postTitle}>
      {enableLink ? (
        <Link href={getBlogLink(post.Slug)}>{postTitle}</Link>
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
        <Link href={getTagLink(tag)} key={tag}>
          {tag}
        </Link>
      ))}
  </div>
)
export const PostCategory = ({ post }) => (
  <div className={`${post.CategoryColor}`}>
    {/* <span className={styles.postCategory}>
      {post.Category ? post.Category : ''}
    </span> */}
    <Link href={getCategoryLink(post.Category)} key={post.Category}>
      <span className={styles.postCategory}>
        {post.Category ? post.Category : ''}
      </span>
    </Link>
  </div>
)

export const PostExcerpt = ({ post }) => (
  <div className={styles.postExcerpt}>
    <p>{post.Excerpt ? post.Excerpt : ''}</p>
  </div>
)

export const PostBody = ({ blocks }) => (
  <div className="content">
    <div className={styles.postBody}>
      <NotionBlocks blocks={blocks} />
    </div>
  </div>
)

export const IndexList = ({ blocks, heading }) => (
  <div className={styles.indexList}>
    <h3>{heading}</h3>
    <MokujiBlocks blocks={blocks} />
  </div>
)

export const ReadMoreLink = ({ post }) => (
  <div className={styles.readMoreLink}>
    <div className={styles.box}>
      <span>
        <Link href={getBlogLink(post.Slug)} className={styles.readMore}>
          Read more
        </Link>
      </span>
    </div>
  </div>
)

export const NextPageLink = ({ firstPost, posts, tag = '', category = '' }) => {
  if (!firstPost) return null
  if (posts.length === 0) return null

  const lastPost = posts[posts.length - 1]

  if (firstPost.Date === lastPost.Date) return null

  return (
    <div className={styles.nextPageLink}>
      <Link
        href={
          tag
            ? getTagBeforeLink(tag, lastPost.Date)
            : category
            ? getCategoryBeforeLink(category, lastPost.Date)
            : getBeforeLink(lastPost.Date)
        }
      >
        Find more articles ＞
      </Link>
    </div>
  )
}
export const NextBackPageLink = ({
  firstPost,
  posts,
  tag = '',
  category = '',
}) => {
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
          href={
            tag
              ? getTagBeforeLink(tag, lastPost.Date)
              : category
              ? getCategoryBeforeLink(category, lastPost.Date)
              : getBeforeLink(lastPost.Date)
          }
          passHref
        >
          <div className={styles.nextPageLink}>Old ＞</div>
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
      data-chrome="nofooter,transparent,noheader,noborders"
      data-width="100%"
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

export const BlogCategoryLink = ({ heading, categorys }) => (
  <div className={styles.blogTagLink}>
    <h3>{heading}</h3>
    <NoContents contents={categorys} />
    <CategoryLinkList categorys={categorys} />
  </div>
)

export const PostLinkList = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <ul>
      {posts.map((post: Post) => {
        return (
          <li key={post.Slug}>
            <Link href={getBlogLink(post.Slug)}>{post.Title}</Link>
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
            <Link href={getTagLink(tag)}>{tag}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export const CategoryLinkList = ({ categorys }) => {
  if (!categorys || categorys.length === 0) return null

  return (
    <ul className={styles.categoryList}>
      {categorys.map((category: string) => {
        return (
          <li key={category}>
            <Link href={getCategoryLink(category)}>{category}</Link>
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
