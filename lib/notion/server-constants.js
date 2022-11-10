/* eslint @typescript-eslint/no-var-requires: 0 */
// use commonjs so it can be required without transpiling

const path = require('path')

const NOTION_API_SECRET = process.env.NOTION_API_SECRET
const DATABASE_ID = process.env.DATABASE_ID
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL
const NEXT_PUBLIC_SITE_TITLE = 'DATA-WORLD-BLOG'
const NEXT_PUBLIC_SITE_DESCRIPTION = "Let's learn Japanese and English! then..."
const NEXT_PUBLIC_GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID
const BLOG_INDEX_CACHE = path.resolve('.blog_index_data')
const NUMBER_OF_POSTS_PER_PAGE = 10
const INDEX_PAGE_ID = process.env.INDEX_PAGE_ID
const TEROBI_PAGE_ID = process.env.TEROBI_PAGE_ID

const SUBMIT_NOTION_API_SECRET = process.env.SUBMIT_NOTION_API_SECRET
const SUBMIT_DATABASE_ID = process.env.SUBMIT_DATABASE_ID

module.exports = {
  NOTION_API_SECRET,
  DATABASE_ID,
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_SITE_DESCRIPTION,
  NEXT_PUBLIC_GA_TRACKING_ID,
  BLOG_INDEX_CACHE,
  NUMBER_OF_POSTS_PER_PAGE,
  INDEX_PAGE_ID,
  TEROBI_PAGE_ID,
  SUBMIT_NOTION_API_SECRET,
  SUBMIT_DATABASE_ID,
}