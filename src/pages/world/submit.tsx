import DocumentHead from '../../components/document-head'

import styles from '../../styles/blog.module.css'
import SubmitForm from '../../components/submit'
import {
  getPosts,
  getFirstPost,
  getAllTags,
  getAllCategorys,
} from '../../lib/notion/client'
import { getEditedDate } from '../../lib/blog-helpers'
import SubmitStyles from '../../styles/submit.module.css'
import { getAllSubmitPosts } from '../../lib/submit_form/client'

export async function getStaticProps() {
  const posts = await getPosts()
  const firstPost = await getFirstPost()
  const tags = await getAllTags()
  const categorys = await getAllCategorys()
  const submitPosts = await getAllSubmitPosts()

  return {
    props: {
      posts,
      firstPost,
      tags,
      submitPosts,
      categorys,
    },
    revalidate: 60,
  }
}

const RenderPostsSpace = ({
  //   posts = [],
  //   firstPost,

  //   tags = [],
  submitPosts = [],
  // categorys = [],
}) => {
  return (
    <div className={styles.container}>
      <DocumentHead title="Space" />
      <SubmitForm />
      <div className={styles.flexWraper}>
        <div className={styles.mainContent}>
          <h4 style={{ textAlign: 'center' }}> &#x2b07; Staging now.....</h4>
          <div className={SubmitStyles.grid}>
            {submitPosts.map((submitPost) => {
              return (
                <div className={SubmitStyles.card} key={submitPost.text}>
                  <div>
                    <p>&#92; &#x1f40d; みんなで英単語 &#47;</p>

                    <p>{submitPost.Text}</p>
                  </div>

                  <p>意味： {submitPost.Trans ? submitPost.Trans : null}</p>
                  <p>参照：{submitPost.Ref ? submitPost.Ref : null}</p>
                  <hr />
                  <p>書いた人：{submitPost.EditedPerson}</p>

                  <p>
                    last edit :{' '}
                    {submitPost.EditedDate
                      ? getEditedDate(submitPost.EditedDate)
                      : null}
                  </p>
                </div>
              )
            })}
          </div>
          <h4
            style={{ textAlign: 'center', color: '#d932ff', fontSize: '0.8em' }}
          >
            {' '}
            I'll check and this vocabulary list will disappear from the list.
          </h4>
        </div>
      </div>
    </div>
  )
}

export default RenderPostsSpace
