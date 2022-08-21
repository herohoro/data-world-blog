import DocumentHead from '../components/document-head'
import ExtLink from '../components/ext-link'
import styles from '../styles/page.module.css'

const RenderPage = () => (
  <div className={styles.container}>
    <DocumentHead />

    <div>
      <h2>gm!</h2>
      <p>
        This blog is written in Notion. <br />
        If you want to start a blog in Notion, Try easy-notion-blog.
      </p>
      <p>
        easy-notion-blog is{' '}
        <ExtLink href="https://github.com/otoyo/easy-notion-blog">
          open source software
        </ExtLink>{' '}
        created by Alpaca teacher.
      </p>
      <br />
      <br />
      <br />
      <h2>The theme of this blog is data analysis</h2>
      <p>
        I will leave the hard stuff to other sites.
        <br />
        "Why do we need data analysis?"
        <br />
        "What good can come from doing data analysis?"
        <br />
        Have you ever asked yourself these questions?
        <br />
        I had many questions when I studied data analysis. <br />
        Even now, I have not been able to solve them.
        <br />
        This blog is about solving those questions together. When you read an
        article, you may want to comment on it, right?
        <br />
        If you do, I would be happy if you tweet me on Twitter.
      </p>
      <br />
      <br />
      <br />
      <h2>I am studying English</h2>
      <p>
        If I can write what I think in English, I can communicate with people
        overseas.
        <br />
        I think that even if speaking is difficult, if I can write, I may be
        able to make friends with whom I can study together.
        <br />
        Right now, I am using a translation tool to have what I want to write
        translated. <br />
        But by writing articles on this blog, I would like to gradually increase
        the number of sentences I can write without using translation tools.
      </p>
    </div>
  </div>
)

export default RenderPage
