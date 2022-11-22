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
// "parent": {
//   "type": "database_id",
//   "database_id": "d9824bdc-8445-4327-be8b-5b47500af6ce"
// },
// "properties": {
//   "Name": {
//       "title": [
//           {
//               "text": {
//                   "content": "Tuscan kale"
//               }
//           }
//       ]
//   },
//   "Description": {
//       "rich_text": [
//           {
//               "text": {
//                   "content": "A dark green leafy vegetable"
//               }
//           }
//       ]
//   },

export async function submitPost(submitData: Post) {
  const result = await client.pages.create({
    parent: {
      database_id: SUBMIT_DATABASE_ID,
    },

    properties: {
      Text: {
        title: [
          {
            text: {
              content: submitData.Text,
            },
          },
        ],
      },
      Trans: {
        rich_text: [
          {
            text: {
              content: submitData.Trans,
            },
          },
        ],
      },
      EditedPerson: {
        rich_text: [
          {
            text: {
              content: submitData.EditedPerson,
            },
          },
        ],
      },
    },
  })

  if (!result) {
    return null
  }

  return _buildPost(result)
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
