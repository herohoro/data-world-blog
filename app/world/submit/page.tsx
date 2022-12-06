import styles from '../../../styles/blog.module.css'
import SubmitForm from '../../../components/submit'

import { getEditedDate } from '../../../lib/blog-helpers'
import SubmitStyles from '../../../styles/submit.module.css'
import { getAllSubmitPosts } from '../../../lib/submit_form/client'

export const revalidate = 60

const RenderSubmit = async () => {
  const [submitPosts] = await Promise.all([getAllSubmitPosts()])

  return (
    <div className={styles.container}>
      <SubmitForm />
      <div className={styles.flexWraper}>
        <div className={styles.mainContent}>
          <h4 style={{ textAlign: 'center' }}> &#x2b07; Staging now.....</h4>
          <div className={SubmitStyles.grid}>
            {submitPosts.map((submitPost) => {
              return (
                <div className={SubmitStyles.card} key={submitPost.Text}>
                  <div>
                    <p>&#92; &#x1f40d; みんなの単語帳 &#47;</p>

                    <p>{submitPost.Text}</p>
                  </div>

                  <p>意味： {submitPost.Trans ? submitPost.Trans : null}</p>
                  <p>参照：{submitPost.Ref ? submitPost.Ref : null}</p>
                  <p
                    style={{
                      color: '#45f3ff',
                      fontSize: '0.8em',
                      lineHeight: '1.2em',
                    }}
                  >
                    {' '}
                    #{submitPost.EditedPerson}_ひよこ #日本語 #English
                    #世界の言葉
                  </p>
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
            I&apos;ll check and this vocabulary list will disappear from the
            list.
          </h4>
        </div>
      </div>
    </div>
  )
}

export default RenderSubmit
