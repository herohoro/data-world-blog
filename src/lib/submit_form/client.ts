import {
  SUBMIT_NOTION_API_SECRET,
  SUBMIT_DATABASE_ID,
} from '../notion/server-constants'
import { Post } from './interfaces'

const { Client } = require('@notionhq/client')
const client = new Client({
  auth: SUBMIT_NOTION_API_SECRET,
})

export async function getAllSubmitPosts() {
  let results = []

  const params = {
    database_id: SUBMIT_DATABASE_ID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: false,
      },
    },
    // sorts: [
    //   {
    //     property: 'EditedDate',
    //     direction: 'descending',
    //   },
    // ],
  }
  const data = await client.databases.query(params)

  results = results.concat(data.results)

  params['start_cursor'] = data.next_cursor

  return results.map((item) => _buildPost(item))
}

function _buildPost(data) {
  const prop = data.properties

  const post: Post = {
    Text: prop.Text.title[0].plain_text,
    Trans:
      prop.Trans.rich_text.length > 0 ? prop.Trans.rich_text[0].plain_text : '',
    Ref: prop.Ref.rich_text.length > 0 ? prop.Ref.rich_text[0].plain_text : '',
    EditedPerson:
      prop.EditedPerson.rich_text.length > 0
        ? prop.EditedPerson.rich_text[0].plain_text
        : '',
    EditedDate: prop.EditedDate.last_edited_time,
  }

  return post
}
